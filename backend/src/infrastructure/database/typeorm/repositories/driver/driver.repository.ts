import { Injectable } from '@nestjs/common';
import { Driver, DriverRepository } from '@domain/ports/repository';
import { Repository } from 'typeorm';
import { dataSource } from '../../datasource';
import { TypeORMDriverEntity } from '../../entities/driver/driver.entity';
import { TypeORMDriverMapper } from '../../mappers/driver/driver.mapper';

@Injectable()
export class TypeORMDriverRepository implements DriverRepository {
  private readonly repository: Repository<TypeORMDriverEntity>;

  constructor() {
    this.repository = dataSource.getRepository(TypeORMDriverEntity);
  }

  public async findAll(): Promise<Driver[]> {
    const drivers = await this.repository.find();
    return TypeORMDriverMapper.toDomainList(drivers);
  }

  public async findById(id: number): Promise<Driver | null> {
    const driver = await this.repository.findOne({ where: { id } });
    return driver ? TypeORMDriverMapper.toDomain(driver) : null;
  }
}
