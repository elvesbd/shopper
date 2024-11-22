import { Driver } from '@domain/shared';

export type RideListInput = {
  customer_id: string;
  driver_id?: number;
};

type Ride = {
  id: number;
  date: string;
  value: number;
  origin: string;
  driver: Driver;
  distance: number;
  duration: string;
  destination: string;
};

export type RideListOtput = {
  customer_id: string;
  rides: Ride[];
};
