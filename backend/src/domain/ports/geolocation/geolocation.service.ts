export type Coordinates = {
  lat: number;
  lng: number;
};

export abstract class GeolocationService {
  abstract getCoordinates(address: string): Promise<Coordinates>;
}
