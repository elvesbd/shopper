export const GOOGLE_API_BASE_URL = {
  GEOCODE: 'https://maps.googleapis.com/maps/api/geocode/json',
  DIRECTIONS: 'https://routes.googleapis.com/directions/v2:computeRoutes',
};

export const GOOGLE_API_HEADERS = {
  FIELD_MASK:
    'routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline',
};
