import { Ride } from '@domain/entities';

export abstract class RideRepository {
  abstract save(ride: Ride): Promise<void>;
  abstract findAll(): Promise<Ride[]>;
  abstract findByCustomerAndDriver(
    customer_Id: string,
    driver_id?: number,
  ): Promise<Ride[]>;
}
