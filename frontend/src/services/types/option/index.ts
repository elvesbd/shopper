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

export type EstimateResponse = {
	origin: {
		latitude: number;
		longitude: number;
	};
	destination: {
		latitude: number;
		longitude: number;
	};
	distance: number;
	duration: string;
	options: Option[];
	routeResponse: RouteResponse;
};
