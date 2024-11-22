import { Injectable } from '@nestjs/common';

import { Driver, DriverRepository } from '@domain/ports/repository';
import {
  SortedDriver,
  DriverWithPrice,
} from '@domain/services/driver-service/types';

@Injectable()
export class DriversService {
  constructor(private readonly driverRepository: DriverRepository) {}

  async getSortedDriversForRoute(
    distanceMeters: number,
  ): Promise<SortedDriver> {
    const drivers = await this.driverRepository.findAll();

    const availableDrivers = this.filterAvailableDrivers(
      drivers,
      distanceMeters,
    );

    const driversWithPrices = this.calculateDriverPrices(
      availableDrivers,
      distanceMeters,
    );

    return this.sortDriversByPrice(driversWithPrices);
  }

  private filterAvailableDrivers(
    drivers: Driver[],
    distanceMeters: number,
  ): Driver[] {
    return drivers.filter((driver) => distanceMeters >= driver.minimumMeters);
  }

  private calculateDriverPrices(
    drivers: Driver[],
    distanceMeters: number,
  ): DriverWithPrice[] {
    return drivers.map((driver) => ({
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.vehicle,
      review: {
        rating: driver.review.rating,
        comment: driver.review.comment,
      },
      value: this.calculatePrice(driver.pricePerKm, distanceMeters),
    }));
  }

  private sortDriversByPrice(drivers: DriverWithPrice[]): DriverWithPrice[] {
    return drivers.sort((a, b) => a.value - b.value);
  }

  private calculatePrice(pricePerKm: number, distanceMeters: number): number {
    const priceInCents = pricePerKm * (distanceMeters / 1000);
    return priceInCents;
  }
}
