import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

import { dataSource } from './typeorm/datasource';
import { DatabaseService } from './database.service';
import { TypeORMDriverRepository } from './typeorm/repositories';
import { DriverRepository, RideRepository } from '@domain/ports/repository';
import { TypeORMRideRepository } from './typeorm/repositories/ride/ride.repository';
import { DatabaseInitService } from './init.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService,
      dataSourceFactory: async (
        options?: DataSourceOptions,
      ): Promise<DataSource> => {
        if (!options) {
          throw new Error('No DataSource options were provided!');
        }

        return dataSource.initialize();
      },
    }),
  ],
  providers: [
    {
      provide: DriverRepository,
      useClass: TypeORMDriverRepository,
    },
    {
      provide: RideRepository,
      useClass: TypeORMRideRepository,
    },
    DatabaseInitService,
  ],
  exports: [DriverRepository, RideRepository],
})
export class DatabaseModule {}
