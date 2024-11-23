type Route = {
  distanceMeters: number;
  duration: string;
  polyline: Polyline;
};

type Polyline = {
  encodedPolyline: string;
};

export type RoutesResponse = {
  routes: Route[];
};
