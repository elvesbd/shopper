import { Injectable } from '@nestjs/common';
import { Ride } from '@domain/entities';
import {
  DriverNotFoundException,
  InvalidDistanceException,
} from '@domain/exceptions';
import {
  RideConfirmInput,
  RideConfirmOutput,
} from '@domain/usecases/ride-confirm/types';
import { DriverRepository, RideRepository } from '@domain/ports/repository';

@Injectable()
export class RideConfirmUseCase {
  constructor(
    private readonly rideRepository: RideRepository,
    private readonly driverRepository: DriverRepository,
  ) {}

  async execute(input: RideConfirmInput): Promise<RideConfirmOutput> {
    await this.validateDriver(input);

    const ride = Ride.create(input);

    await this.rideRepository.save(ride);

    return { success: true };
  }

  private async validateDriver(input: RideConfirmInput): Promise<void> {
    const driver = await this.driverRepository.findById(input.driver.id);

    if (!driver || driver.name !== input.driver.name) {
      throw new DriverNotFoundException();
    }

    if (input.distance < driver.minimumMeters) {
      throw new InvalidDistanceException(input.distance);
    }
  }
}
