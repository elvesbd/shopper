export type Route = {
  distanceMeters: number;
  duration: string;
  polyline: {
    encodedPolyline: string;
  };
};

export abstract class RoutesServices {
  abstract calculateRoute(
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number },
  ): Promise<{ routes: Route[] }>;
}
