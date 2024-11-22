import { Injectable } from '@nestjs/common';

import { Ride } from '@domain/entities';
import { RideListInput } from '@domain/usecases/ride-list/types';
import { DriverRepository, RideRepository } from '@domain/ports/repository';
import {
  InvalidDriverException,
  RidesNotFoundException,
} from '@domain/exceptions';

@Injectable()
export class RideListUseCase {
  constructor(
    private readonly rideRepository: RideRepository,
    private readonly driverRepository: DriverRepository,
  ) {}

  public async execute(input: RideListInput): Promise<Ride[]> {
    const { customer_id, driver_id } = input;

    await this.validateDriver(driver_id);

    const rides = await this.rideRepository.findByCustomerAndDriver(
      customer_id,
      driver_id,
    );
    await this.verifyRidesExist(rides);

    return rides;
  }

  private async validateDriver(driver_id?: number): Promise<void> {
    if (
      driver_id !== undefined &&
      !(await this.driverRepository.findById(driver_id))
    ) {
      throw new InvalidDriverException();
    }
  }

  private async verifyRidesExist(rides: any[]): Promise<void> {
    if (rides.length === 0) throw new RidesNotFoundException();
  }
}
