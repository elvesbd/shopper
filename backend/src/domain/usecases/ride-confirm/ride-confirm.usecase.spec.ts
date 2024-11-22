import { Test, TestingModule } from '@nestjs/testing';

import {
  DriverDataBuilder,
  RideDataBuilder,
} from '@test/__mocks__/data-builder';
import {
  DriverNotFoundException,
  InvalidDistanceException,
} from '@domain/exceptions';
import { RideConfirmUseCase } from './ride-confirm.usecase';
import { DriverRepository, RideRepository } from '@domain/ports/repository';

describe('RideConfirmUseCase', () => {
  let sut: RideConfirmUseCase;
  let rideRepository: RideRepository;
  let driverRepository: DriverRepository;

  const input = RideDataBuilder.aRide().build();
  const driver = DriverDataBuilder.aDriver().build();

  beforeEach(async () => {
    jest.clearAllMocks();

    const RideRepositoryProvider = {
      provide: RideRepository,
      useValue: {
        save: jest.fn().mockResolvedValue(0),
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
        RideConfirmUseCase,
        DriverRepositoryProvider,
        RideRepositoryProvider,
      ],
    }).compile();

    sut = app.get<RideConfirmUseCase>(RideConfirmUseCase);
    rideRepository = app.get<RideRepository>(RideRepository);
    driverRepository = app.get<DriverRepository>(DriverRepository);
  });

  it('should defined', () => {
    expect(sut).toBeDefined();
    expect(driverRepository).toBeDefined();
    expect(rideRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should throw DriverNotFoundException when driver does not exist in the repository', async () => {
      jest.spyOn(driverRepository, 'findById').mockResolvedValueOnce(undefined);

      await expect(sut.execute(input)).rejects.toThrow(DriverNotFoundException);

      expect(driverRepository.findById).toHaveBeenCalledTimes(1);
      expect(driverRepository.findById).toHaveBeenCalledWith(input.driver.id);
      expect(rideRepository.save).not.toHaveBeenCalled();
    });

    it('should throw DriverNotFoundException when driver exists but does not meet criteria', async () => {
      const driver = DriverDataBuilder.aDriver()
        .withName('Elves Brito')
        .build();
      jest.spyOn(driverRepository, 'findById').mockResolvedValueOnce(driver);

      await expect(sut.execute(input)).rejects.toThrow(DriverNotFoundException);

      expect(driverRepository.findById).toHaveBeenCalledTimes(1);
      expect(driverRepository.findById).toHaveBeenCalledWith(input.driver.id);
      expect(rideRepository.save).not.toHaveBeenCalled();
    });

    it('should throw InvalidDistanceException when input distance is below driver’s minimum requirement', async () => {
      const driver = DriverDataBuilder.aDriver()
        .withMinimumMeters(2000)
        .build();
      jest.spyOn(driverRepository, 'findById').mockResolvedValueOnce(driver);

      await expect(sut.execute(input)).rejects.toThrow(
        InvalidDistanceException,
      );

      expect(driverRepository.findById).toHaveBeenCalledTimes(1);
      expect(driverRepository.findById).toHaveBeenCalledWith(input.driver.id);
      expect(rideRepository.save).not.toHaveBeenCalled();
    });

    it('should return success when input data is valid and matches all criteria', async () => {
      const output = { success: true };

      const result = await sut.execute(input);

      expect(result).toStrictEqual(output);
    });
  });
});
