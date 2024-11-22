import { Test, TestingModule } from '@nestjs/testing';
import { DriversService } from './driver.service';
import { DriverRepository } from '@domain/ports/repository';
import { DriverDataBuilder } from '@test/__mocks__/data-builder';

describe('DriversService', () => {
  let sut: DriversService;
  let driverRepository: DriverRepository;

  const driverA = DriverDataBuilder.aDriver().build();
  const driverB = DriverDataBuilder.aDriver()
    .withId(2)
    .withName('Driver B')
    .withPricePerKm(300)
    .withMinimumMeters(500)
    .build();
  const driverC = DriverDataBuilder.aDriver()
    .withId(3)
    .withName('Driver C')
    .withPricePerKm(100)
    .withMinimumMeters(1500)
    .build();

  const drivers = [driverA, driverB, driverC];

  beforeEach(async () => {
    jest.clearAllMocks();

    const DriverRepositoryProvider = {
      provide: DriverRepository,
      useValue: {
        findAll: jest.fn().mockResolvedValue(drivers),
      },
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [DriversService, DriverRepositoryProvider],
    }).compile();

    sut = app.get<DriversService>(DriversService);
    driverRepository = app.get<DriverRepository>(DriverRepository);
  });

  it('should defined', () => {
    expect(sut).toBeDefined();
    expect(driverRepository).toBeDefined();
  });

  describe('getSortedDriversForRoute', () => {
    it('should call driverRepository.findAll on success', async () => {
      const distanceMeters = 1500;

      await sut.getSortedDriversForRoute(distanceMeters);

      expect(driverRepository.findAll).toHaveBeenCalledWith();
      expect(driverRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return sorted drivers by price for a valid route', async () => {
      const distanceMeters = 1500;

      const sortedDrivers = await sut.getSortedDriversForRoute(distanceMeters);

      expect(sortedDrivers).toEqual([
        expect.objectContaining({ id: 3, value: 150 }),
        expect.objectContaining({ id: 1, value: 375 }),
        expect.objectContaining({ id: 2, value: 450 }),
      ]);
    });

    it('should filter out drivers that do not meet the minimum distance requirement', async () => {
      const distanceMeters = 500;

      const sortedDrivers = await sut.getSortedDriversForRoute(distanceMeters);

      expect(sortedDrivers.length).toBe(1);
      expect(sortedDrivers[0]).toEqual(expect.objectContaining({ id: 2 }));
    });
  });
});
