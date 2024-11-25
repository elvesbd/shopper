import type { Driver } from "../types";

// Tipo base para Ride, com campos comuns
export type RideBase = {
	id: string;
	date: string;
	origin: string;
	destination: string;
	distance: string;
	duration: string;
	driver: Driver;
	value: string;
};

// Definições de Ride para diferentes cenários
export type Ride = RideBase & {
	distance: number;
	value: number;
};

export type RideDomainItem = RideBase; // Utilizando a base

export type RideDomainList = {
	customer_id: string;
	rides: RideDomainItem[];
};

export type RidePersistence = {
	customer_id: string;
	origin: string;
	destination: string;
	distance: number;
	duration: string;
	driver: Driver;
	value: number;
};

export type ConfirmRequest = {
	customer_id: string;
	origin: string;
	destination: string;
	distance: number;
	duration: string;
	driver: Driver;
	value: string;
};

export type RideDomain = ConfirmRequest;

export type ConfirmResponse = {
	success: boolean;
};

export type RideListResponse = {
	customer_id: string;
	rides: Ride[];
};
