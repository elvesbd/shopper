import { Driver } from '@domain/ports/repository';
import { TypeORMDriverEntity } from '../../entities';

export class TypeORMDriverMapper {
  public static toDomainList(drivers: TypeORMDriverEntity[]): Driver[] {
    return drivers.map((driver) => ({
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.vehicle,
      review: {
        rating: driver.rating,
        comment: driver.comment,
      },
      pricePerKm: driver.pricePerKm,
      minimumMeters: driver.minimumMeters,
    }));
  }

  public static toDomain(driver: TypeORMDriverEntity): Driver {
    return {
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.vehicle,
      review: {
        rating: driver.rating,
        comment: driver.comment,
      },
      pricePerKm: driver.pricePerKm,
      minimumMeters: driver.minimumMeters,
    };
  }
}
