import { Injectable } from '@nestjs/common';

import {
  RideEstimateInput,
  RideEstimateOutput,
} from '@domain/usecases/ride-estimate/types';
import { DriversService, RideService } from '@domain/services';

@Injectable()
export class RideEstimateUseCase {
  constructor(
    private readonly rideService: RideService,
    private readonly driversService: DriversService,
  ) {}

  async execute(input: RideEstimateInput): Promise<RideEstimateOutput> {
    const { origin, destination } = input;

    const { originCoordinates, destinationCoordinates } =
      await this.rideService.getCoordinatesForAddresses(origin, destination);

    const routeDetails = await this.rideService.calculateRouteDetails(
      originCoordinates,
      destinationCoordinates,
    );

    const drivers = await this.driversService.getSortedDriversForRoute(
      routeDetails.distanceMeters,
    );

    return {
      origin: originCoordinates,
      destination: destinationCoordinates,
      distance: routeDetails.distanceMeters,
      duration: routeDetails.duration,
      options: drivers,
      routeResponse: routeDetails,
    };
  }
}
