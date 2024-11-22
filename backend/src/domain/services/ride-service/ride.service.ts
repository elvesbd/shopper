import { Injectable } from '@nestjs/common';

import { Route, RoutesServices } from '@domain/ports/routes';
import { Coordinates, GeolocationService } from '@domain/ports/geolocation';

@Injectable()
export class RideService {
  constructor(
    private readonly routesServices: RoutesServices,
    private readonly geolocationService: GeolocationService,
  ) {}

  async getCoordinatesForAddresses(
    originAddress: string,
    destinationAddress: string,
  ): Promise<{
    originCoordinates: Coordinates;
    destinationCoordinates: Coordinates;
  }> {
    const [originCoordinates, destinationCoordinates] = await Promise.all([
      this.geolocationService.getCoordinates(originAddress),
      this.geolocationService.getCoordinates(destinationAddress),
    ]);

    return { originCoordinates, destinationCoordinates };
  }

  async calculateRouteDetails(
    originCoordinates: Coordinates,
    destinationCoordinates: Coordinates,
  ): Promise<Route> {
    const routeDetails = await this.routesServices.calculateRoute(
      originCoordinates,
      destinationCoordinates,
    );

    return routeDetails.routes[0];
  }
}
