import { Test, TestingModule } from '@nestjs/testing';

import {
  RouteDataBuilder,
  GeolocationDataBuilder,
} from '@test/__mocks__/data-builder';
import { RideEstimateUseCase } from '@domain/usecases';
import { DriversService, RideService } from '@domain/services';
import { DriverWithPrice } from '@domain/services/driver-service/types';

describe('RideEstimateUseCase', () => {
  let sut: RideEstimateUseCase;
  let rideService: RideService;
  let driversService: DriversService;

  const route = RouteDataBuilder.aRoute().build();
  const routeDetails = route.routes[0];
  const originCoordinates = GeolocationDataBuilder.aGeolocation().build();
  const destinationCoordinates = GeolocationDataBuilder.aGeolocation()
    .withLocation(-12.34567, 45.6789)
    .build();

  const driverA: DriverWithPrice = {
    id: 1,
    name: 'Driver A',
    description:
      'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
    vehicle: 'Plymouth Valiant 1973 rosa e enferrujado',
    review: {
      rating: 2,
      comment:
        'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
    },
    value: 250,
  };
  const driverB: DriverWithPrice = {
    id: 2,
    name: 'Driver B',
    description:
      'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
    vehicle: 'Dodge Charger R/T 1970 modificado',
    review: {
      rating: 4,
      comment:
        'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!',
    },
    value: 1000,
  };

  const drivers = [driverA, driverB];

  beforeEach(async () => {
    jest.clearAllMocks();

    const RideServiceProvider = {
      provide: RideService,
      useValue: {
        calculateRouteDetails: jest.fn().mockResolvedValue(routeDetails),
        getCoordinatesForAddresses: jest.fn().mockResolvedValue({
          originCoordinates,
          destinationCoordinates,
        }),
      },
    };

    const DriversServiceProvider = {
      provide: DriversService,
      useValue: {
        getSortedDriversForRoute: jest.fn().mockResolvedValue(drivers),
      },
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [
        RideEstimateUseCase,
        RideServiceProvider,
        DriversServiceProvider,
      ],
    }).compile();

    sut = app.get<RideEstimateUseCase>(RideEstimateUseCase);
    rideService = app.get<RideService>(RideService);
    driversService = app.get<DriversService>(DriversService);
  });

  it('should defined', () => {
    expect(sut).toBeDefined();
    expect(rideService).toBeDefined();
    expect(driversService).toBeDefined();
  });

  describe('execute', () => {
    const input = {
      customer_id: '1',
      origin: 'Origin Address',
      destination: 'Destination Address',
    };

    it('should call rideService.getCoordinatesForAddresseswith correct values', async () => {
      await sut.execute(input);

      expect(rideService.getCoordinatesForAddresses).toHaveBeenCalledTimes(1);
      expect(rideService.getCoordinatesForAddresses).toHaveBeenCalledWith(
        input.origin,
        input.destination,
      );
    });

    it('should call rideService.calculateRouteDetails correct values', async () => {
      await sut.execute(input);

      expect(rideService.calculateRouteDetails).toHaveBeenCalledTimes(1);
      expect(rideService.calculateRouteDetails).toHaveBeenCalledWith(
        originCoordinates,
        destinationCoordinates,
      );
    });

    it('should call driversService.getSortedDriversForRoute correct values', async () => {
      await sut.execute(input);

      expect(driversService.getSortedDriversForRoute).toHaveBeenCalledTimes(1);
      expect(driversService.getSortedDriversForRoute).toHaveBeenCalledWith(
        routeDetails.distanceMeters,
      );
    });

    it('should call rideService and driversService correctly and return expected result', async () => {
      const input = {
        customer_id: '1',
        origin: 'Origin Address',
        destination: 'Destination Address',
      };

      const result = await sut.execute(input);

      expect(result).toStrictEqual({
        origin: originCoordinates,
        destination: destinationCoordinates,
        distance: routeDetails.distanceMeters,
        duration: routeDetails.duration,
        options: drivers,
        routeResponse: routeDetails,
      });
    });
  });
});
