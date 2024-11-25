class Location {
  lat: number;
  lng: number;
}

class Review {
  rating: number;
  comment: string;
}

class Option {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: Review;
  value: number;
}

class Polyline {
  encodedPolyline: string;
}

class RouteResponse {
  distanceMeters: number;
  duration: string;
  polyline: Polyline;
}

class LocationResponse {
  latitude: number;
  longitude: number;
}

class RideEstimate {
  origin: Location;
  destination: Location;
  distance: number;
  duration: string;
  options: Option[];
  routeResponse: RouteResponse;
}

export class RideEstimateViewModelResponse {
  origin: LocationResponse;
  destination: LocationResponse;
  distance: number;
  duration: string;
  options: Option[];
  routeResponse: RouteResponse;
}

export class RideEstimateViewModel {
  public static toHTTP(
    rideEstimate: RideEstimate,
  ): RideEstimateViewModelResponse {
    return {
      origin: {
        latitude: rideEstimate.origin.lat,
        longitude: rideEstimate.origin.lng,
      },
      destination: {
        latitude: rideEstimate.destination.lat,
        longitude: rideEstimate.destination.lng,
      },
      distance: rideEstimate.distance,
      duration: rideEstimate.duration,
      options: rideEstimate.options.map((option) => ({
        ...option,
        value: RideEstimateViewModel.convertCentsToReais(option.value),
      })),
      routeResponse: rideEstimate.routeResponse,
    };
  }

  private static convertCentsToReais(valueInCentavos: number): number {
    const valueInReais = valueInCentavos / 100;
    return parseFloat(valueInReais.toFixed(2));
  }
}
