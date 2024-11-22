export type Review = {
  rating: number;
  comment: string;
};

export type Driver = {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: Review;
  pricePerKm: number;
  minimumMeters: number;
};

export abstract class DriverRepository {
  abstract findAll(): Promise<Driver[]>;
  abstract findById(id: number): Promise<Driver | null>;
}
