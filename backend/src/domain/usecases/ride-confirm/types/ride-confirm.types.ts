import { Driver } from '@domain/shared';

export type RideConfirmInput = {
  value: number;
  origin: string;
  driver: Driver;
  distance: number;
  duration: string;
  destination: string;
  customer_id: string;
};

export type RideConfirmOutput = {
  success: boolean;
};
