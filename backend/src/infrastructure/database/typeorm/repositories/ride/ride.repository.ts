import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Ride } from '@domain/entities';
import { dataSource } from '../../datasource';
import { RideRepository } from '@domain/ports/repository';
import { TypeORMRideEntity } from '../../entities/rides/ride.entity';
import { TypeORMRideMapper } from '../../mappers/ride/ride.mapper';

@Injectable()
export class TypeORMRideRepository implements RideRepository {
  private readonly repository: Repository<TypeORMRideEntity>;

  constructor() {
    this.repository = dataSource.getRepository(TypeORMRideEntity);
  }

  public async save(ride: Ride): Promise<void> {
    const newRide = TypeORMRideMapper.toPersistence(ride);
    await this.repository.save(newRide);
  }

  public async findAll(): Promise<Ride[]> {
    const rides = await this.repository.find();
    return TypeORMRideMapper.toDomainList(rides);
  }

  public async findByCustomerAndDriver(
    customer_id: string,
    driver_id?: number,
  ): Promise<Ride[]> {
    const rides = await this.repository.find({
      where: { customer_id, ...(driver_id !== undefined && { driver_id }) },
    });
    return TypeORMRideMapper.toDomainList(rides);
  }
}
