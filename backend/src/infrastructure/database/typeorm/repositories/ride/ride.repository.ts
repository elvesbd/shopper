import { Injectable } from '@nestjs/common';

import { Ride } from '@domain/entities';
import { RideRepository } from '@domain/ports/repository';

@Injectable()
export class TypeORMRideRepository implements RideRepository {
  private rides: Ride[] = [];

  async save(ride: Ride): Promise<void> {
    this.rides.push(ride);
    console.log('Viagem salva:', ride);
  }

  async findAll(): Promise<Ride[]> {
    return this.rides;
  }

  async findByCustomerAndDriver(
    customer_id: string,
    driver_id?: number,
  ): Promise<Ride[]> {
    return this.rides.filter(
      (ride) =>
        ride.customer_id === customer_id &&
        (driver_id === undefined || ride.driver_id === driver_id),
    );
  }
}
