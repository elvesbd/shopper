export type GeocodeResponse = {
  results: GeocodeResult[];
  status: string;
};

type GeocodeResult = {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  plus_code?: PlusCode;
  types: string[];
};

type AddressComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};

type Geometry = {
  location: Location;
  location_type: string;
  viewport: Viewport;
  bounds?: Bounds;
};

type Location = {
  lat: number;
  lng: number;
};

type Viewport = {
  northeast: Location;
  southwest: Location;
};

type Bounds = {
  northeast: Location;
  southwest: Location;
};

type PlusCode = {
  compound_code: string;
  global_code: string;
};
