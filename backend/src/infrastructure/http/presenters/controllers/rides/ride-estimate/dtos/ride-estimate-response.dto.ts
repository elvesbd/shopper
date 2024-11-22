class Coordinates {
  lat: number;
  lng: number;
}

class Route {
  distanceMeters: number;
  duration: string;
  polyline: {
    encodedPolyline: string;
  };
}

class Review {
  rating: number;
  comment: string;
}

class DriverWithPrice {
  id: number;
  name: string;
  value: number;
  review: Review;
  vehicle: string;
  description: string;
}

export class RideEstimateResponseDto {
  origin: Coordinates;
  destination: Coordinates;
  distance: number;
  duration: string;
  options: DriverWithPrice[];
  routeResponse: Route;
}
