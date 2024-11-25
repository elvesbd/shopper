import type { Review } from "../types";

export type Option = {
	id: number;
	name: string;
	description: string;
	vehicle: string;
	review: Review;
	value: number;
};

export type RouteResponse = {
	distanceMeters: number;
	duration: string;
	polyline: {
		encodedPolyline: string;
	};
};

export type EstimateRequest = {
	customer_id: string;
	origin: string;
	destination: string;
};

export type Coordinates = {
	latitude: number;
	longitude: number;
};

export type EstimateResponse = {
	origin: Coordinates;
	destination: Coordinates;
	distance: number;
	duration: string;
	options: Option[];
	routeResponse: RouteResponse;
};

export type Driver = {
	id: number;
	name: string;
	description: string;
	vehicle: string;
	review: Review;
	value: string;
};

export type RideEstimateDomainItem = {
	origin: Coordinates;
	destination: Coordinates;
	distance: string;
	duration: string;
	drivers: Driver[];
	routeResponse: RouteResponse;
};
