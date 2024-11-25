import type {
	EstimateResponse,
	RideEstimateDomainItem,
} from "../types/estimate";
import type {
	RideListResponse,
	RideDomainList,
	RideDomain,
	RidePersistence,
} from "../types/rides";

class RideMapper {
	toPersistence(domainRide: RideDomain): RidePersistence {
		return {
			customer_id: domainRide.customer_id,
			origin: domainRide.origin,
			destination: domainRide.destination,
			distance: domainRide.distance,
			duration: domainRide.duration,
			driver: {
				id: domainRide.driver.id,
				name: domainRide.driver.name,
			},
			value: this.convertToCentavos(domainRide.value),
		};
	}

	toDomainList(list: RideListResponse): RideDomainList {
		return {
			customer_id: list.customer_id,
			rides: list.rides.map((ride) => ({
				id: ride.id,
				date: this.formatDate(ride.date),
				origin: ride.origin,
				destination: ride.destination,
				distance: this.formatDistance(ride.distance),
				duration: this.formatDuration(ride.duration),
				driver: ride.driver,
				value: this.formatValue(ride.value),
			})),
		};
	}

	toDomainEstimate(estimate: EstimateResponse): RideEstimateDomainItem {
		return {
			origin: estimate.origin,
			destination: estimate.destination,
			distance: this.formatDistance(estimate.distance),
			duration: this.formatDuration(estimate.duration),
			drivers: estimate.options.map((driver) => ({
				id: driver.id,
				name: driver.name,
				description: driver.description,
				vehicle: driver.vehicle,
				review: driver.review,
				value: this.formatValue(driver.value),
			})),
			routeResponse: estimate.routeResponse,
		};
	}

	private formatDate(date: string): string {
		const parsedDate = new Date(date);
		return parsedDate
			.toLocaleString("pt-BR", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
				hour: "2-digit",
				minute: "2-digit",
				hour12: false,
			})
			.replace(",", "")
			.replace(/\//g, "-");
	}

	private formatDistance(distance: number): string {
		return `${(distance / 1000).toFixed(2)} km`; // Formata para 2 casas decimais
	}

	private formatDuration(duration: string): string {
		const seconds = Number.parseInt(duration.replace("s", ""), 10);
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
	}

	private formatValue(value: number): string {
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(value);
	}

	private convertToCentavos(value: string): number {
		const valueInReais = Number.parseFloat(value.replace("R$", "").trim());
		return Math.round(valueInReais * 100);
	}
}

export default new RideMapper();
