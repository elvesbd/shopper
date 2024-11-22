class Driver {
  id: number;
  name: string;
}

class Ride {
  id: string;
  date: Date;
  value: number;
  origin: string;
  driver: Driver;
  distance: number;
  duration: string;
  destination: string;
  customer_id: string;
}

export class RideListViewModelResponse {
  customer_id: string;
  rides: Omit<Ride, 'customer_id'>[];
}

export class RideListViewModel {
  public static toHTTP(rides: Ride[]): RideListViewModelResponse {
    const customer_id = rides[0].customer_id || '';

    const mappedRides = rides.map((ride) => ({
      id: ride.id,
      date: ride.date,
      origin: ride.origin,
      destination: ride.destination,
      distance: ride.distance,
      duration: ride.duration,
      driver: ride.driver,
      value: ride.value,
    }));

    return {
      customer_id,
      rides: mappedRides,
    };
  }
}
