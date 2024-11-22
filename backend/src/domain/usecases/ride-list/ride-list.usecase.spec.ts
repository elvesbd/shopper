import { Test, TestingModule } from '@nestjs/testing';

import { Ride } from '@domain/entities';
import { RideListUseCase } from '@domain/usecases';
import { DriverRepository, RideRepository } from '@domain/ports/repository';
import {
  DriverDataBuilder,
  RideDataBuilder,
} from '@test/__mocks__/data-builder';
import {
  InvalidDriverException,
  RidesNotFoundException,
} from '@domain/exceptions';

describe('RideListUseCase', () => {
  let sut: RideListUseCase;
  let rideRepository: RideRepository;
  let driverRepository: DriverRepository;

  const props = RideDataBuilder.aRide().build();
  const rides = Ride.create(props);
  const driver = DriverDataBuilder.aDriver().build();

  beforeEach(async () => {
    jest.clearAllMocks();

    const RideRepositoryProvider = {
      provide: RideRepository,
      useValue: {
        findByCustomerAndDriver: jest.fn().mockResolvedValue(rides),
      },
    };

    const DriverRepositoryProvider = {
      provide: DriverRepository,
      useValue: {
        findById: jest.fn().mockResolvedValue(driver),
      },
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [
        RideListUseCase,
        DriverRepositoryProvider,
        RideRepositoryProvider,
      ],
    }).compile();

    sut = app.get<RideListUseCase>(RideListUseCase);
    rideRepository = app.get<RideRepository>(RideRepository);
    driverRepository = app.get<DriverRepository>(DriverRepository);
  });

  it('should defined', () => {
    expect(sut).toBeDefined();
    expect(driverRepository).toBeDefined();
    expect(rideRepository).toBeDefined();
  });

  describe('execute', () => {
    const input = { customer_id: '1', driver_id: 1 };

    it('should return rides when customer and driver are valid', async () => {
      const result = await sut.execute(input);
      expect(result).toStrictEqual(rides);
    });

    it('should throw InvalidDriverException when driver does not exist', async () => {
      jest.spyOn(driverRepository, 'findById').mockResolvedValueOnce(undefined);

      await expect(sut.execute(input)).rejects.toThrow(InvalidDriverException);

      expect(driverRepository.findById).toHaveBeenCalledTimes(1);
      expect(driverRepository.findById).toHaveBeenCalledWith(input.driver_id);

      expect(rideRepository.findByCustomerAndDriver).not.toHaveBeenCalled();
    });

    it('should throw RidesNotFoundException when no rides are found', async () => {
      jest
        .spyOn(rideRepository, 'findByCustomerAndDriver')
        .mockResolvedValueOnce([]);

      await expect(sut.execute(input)).rejects.toThrow(RidesNotFoundException);

      expect(driverRepository.findById).toHaveBeenCalledTimes(1);
      expect(driverRepository.findById).toHaveBeenCalledWith(input.driver_id);

      expect(rideRepository.findByCustomerAndDriver).toHaveBeenCalledTimes(1);
      expect(rideRepository.findByCustomerAndDriver).toHaveBeenCalledWith(
        input.customer_id,
        input.driver_id,
      );
    });
  });
});
