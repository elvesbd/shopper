import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database';
import { GoogleModule } from '../external-services/google/google.module';
import { RoutesServices } from '@domain/ports/routes';
import { DriversService, RideService } from '@domain/services';
import { GeolocationService } from '@domain/ports/geolocation';
import { DriverRepository, RideRepository } from '@domain/ports/repository';
import {
  RideListUseCase,
  RideConfirmUseCase,
  RideEstimateUseCase,
} from '@domain/usecases';
import {
  RideListController,
  RideConfirmController,
  RideEstimateController,
} from './presenters/controllers/rides';

@Module({
  imports: [DatabaseModule, GoogleModule],
  providers: [
    {
      provide: RideService,
      useFactory: (
        routesServices: RoutesServices,
        geolocationService: GeolocationService,
      ): RideService => new RideService(routesServices, geolocationService),
      inject: [RoutesServices, GeolocationService],
    },
    {
      provide: DriversService,
      useFactory: (driverRepository: DriverRepository): DriversService =>
        new DriversService(driverRepository),
      inject: [DriverRepository],
    },
    {
      provide: RideEstimateUseCase,
      useFactory: (
        rideService: RideService,
        driversService: DriversService,
      ): RideEstimateUseCase =>
        new RideEstimateUseCase(rideService, driversService),
      inject: [RideService, DriversService],
    },
    {
      provide: RideConfirmUseCase,
      useFactory: (
        rideRepository: RideRepository,
        driverRepository: DriverRepository,
      ): RideConfirmUseCase =>
        new RideConfirmUseCase(rideRepository, driverRepository),
      inject: [RideRepository, DriverRepository],
    },
    {
      provide: RideListUseCase,
      useFactory: (
        rideRepository: RideRepository,
        driverRepository: DriverRepository,
      ): RideListUseCase =>
        new RideListUseCase(rideRepository, driverRepository),
      inject: [RideRepository, DriverRepository],
    },
  ],
  controllers: [
    RideListController,
    RideConfirmController,
    RideEstimateController,
  ],
})
export class HttpModule {}
