import { Ride } from '@domain/entities';
import { TypeORMRideEntity } from '../../entities/rides/ride.entity';

export class TypeORMRideMapper {
  private constructor() {
    throw new Error(
      'TypeORMRideEntity is a static class and should not be instantiated.',
    );
  }

  public static toDomainList(persistenceList: TypeORMRideEntity[]): Ride[] {
    return persistenceList.map((persistence) => {
      const data = {
        id: persistence.id,
        date: persistence.date,
        origin: persistence.origin,
        distance: persistence.distance,
        duration: persistence.duration,
        driver_id: persistence.driver_id,
        destination: persistence.destination,
        customer_id: persistence.customer_id,
        driver_name: persistence.driver_name,
        driver: {
          id: persistence.driver_id,
          name: persistence.driver_name,
        },
        value: persistence.value,
      };

      return Ride.restore(data);
    });
  }

  public static toPersistence(domain: Ride): TypeORMRideEntity {
    return {
      id: domain.id,
      date: domain.date,
      value: domain.value,
      origin: domain.origin,
      distance: domain.distance,
      duration: domain.duration,
      driver_id: domain.driver.id,
      customer_id: domain.customer_id,
      driver_name: domain.driver.name,
      destination: domain.destination,
    };
  }
}
