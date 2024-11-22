import { Route } from '@domain/ports/routes';
import { Coordinates } from '@domain/ports/geolocation';
import { SortedDriver } from 'src/domain/services/driver-service/types/driver.types';

export type RideEstimateInput = {
  customer_id: string;
  origin: string;
  destination: string;
};

export type RideEstimateOutput = {
  origin: Coordinates;
  destination: Coordinates;
  distance: number;
  duration: string;
  options: SortedDriver;
  routeResponse: Route;
};
