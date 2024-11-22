import { Test, TestingModule } from '@nestjs/testing';

import {
  GeolocationDataBuilder,
  RouteDataBuilder,
} from '@test/__mocks__/data-builder';
import { RideService } from '@domain/services';
import { RoutesServices } from '@domain/ports/routes';
import { GeolocationService } from '@domain/ports/geolocation';

describe('RideService', () => {
  let sut: RideService;
  let routeServices: RoutesServices;
  let geolocationService: GeolocationService;

  const route = RouteDataBuilder.aRoute().build();
  const originCoordinates = GeolocationDataBuilder.aGeolocation().build();
  const destinationCoordinates = GeolocationDataBuilder.aGeolocation()
    .withLocation(-12.34567, 45.6789)
    .build();

  beforeEach(async () => {
    jest.clearAllMocks();

    const GeolocationServiceProvider = {
      provide: GeolocationService,
      useValue: {
        getCoordinates: jest
          .fn()
          .mockResolvedValueOnce(originCoordinates)
          .mockResolvedValueOnce(destinationCoordinates),
      },
    };

    const RoutesServiceProvider = {
      provide: RoutesServices,
      useValue: {
        calculateRoute: jest.fn().mockResolvedValue(route),
      },
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [
        RideService,
        RoutesServiceProvider,
        GeolocationServiceProvider,
      ],
    }).compile();

    sut = app.get<RideService>(RideService);
    routeServices = app.get<RoutesServices>(RoutesServices);
    geolocationService = app.get<GeolocationService>(GeolocationService);
  });

  it('should defined', () => {
    expect(sut).toBeDefined();
    expect(routeServices).toBeDefined();
    expect(geolocationService).toBeDefined();
  });

  describe('getCoordinatesForAddresses', () => {
    const originAddress = 'Origin Address';
    const destinationAddress = 'Destination Address';

    it('should call geolocationService.getCoordinates with correct values', async () => {
      await sut.getCoordinatesForAddresses(originAddress, destinationAddress);

      expect(geolocationService.getCoordinates).toHaveBeenCalledTimes(2);
      expect(geolocationService.getCoordinates).toHaveBeenCalledWith(
        originAddress,
      );
      expect(geolocationService.getCoordinates).toHaveBeenCalledWith(
        destinationAddress,
      );
    });

    it('should return coordinates for origin and destination addresses', async () => {
      const result = await sut.getCoordinatesForAddresses(
        originAddress,
        destinationAddress,
      );

      expect(result.originCoordinates).toStrictEqual(originCoordinates);
      expect(result.destinationCoordinates).toStrictEqual(
        destinationCoordinates,
      );
    });
  });

  describe('calculateRouteDetails', () => {
    it('should call routesServices.calculateRoute with correct values', async () => {
      await sut.calculateRouteDetails(
        originCoordinates,
        destinationCoordinates,
      );

      expect(routeServices.calculateRoute).toHaveBeenCalledTimes(1);
      expect(routeServices.calculateRoute).toHaveBeenCalledWith(
        originCoordinates,
        destinationCoordinates,
      );
    });

    it('should return route details for given coordinates', async () => {
      const result = await sut.calculateRouteDetails(
        originCoordinates,
        destinationCoordinates,
      );

      expect(result).toStrictEqual(route.routes[0]);
    });
  });
});
