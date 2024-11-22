import { Module } from '@nestjs/common';
import { TypeORMDriverRepository } from './typeorm/repositories';
import { TypeORMRideRepository } from './typeorm/repositories/ride/ride.repository';
import { DriverRepository, RideRepository } from '@domain/ports/repository';

@Module({
  imports: [],
  providers: [
    {
      provide: DriverRepository,
      useClass: TypeORMDriverRepository,
    },
    {
      provide: RideRepository,
      useClass: TypeORMRideRepository,
    },
  ],
  exports: [DriverRepository, RideRepository],
})
export class DatabaseModule {}
