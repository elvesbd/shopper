class Driver {
  id: number;
  name: string;
}

export class RideConfirmRequestDto {
  value: number;
  origin: string;
  driver: Driver;
  distance: number;
  duration: string;
  destination: string;
  customer_id: string;
}
