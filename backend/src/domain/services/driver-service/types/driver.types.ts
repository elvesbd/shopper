import { Review } from '@domain/ports/repository';

export type DriverWithPrice = {
  id: number;
  name: string;
  value: number;
  review: Review;
  vehicle: string;
  description: string;
};

export type SortedDriver = DriverWithPrice[];
