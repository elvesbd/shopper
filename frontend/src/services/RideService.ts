import RideMapper from "./mappers/RideMapper";
import HttpClient from "./utils/HttpClient";
import type { RideListResponse } from "./types/rides/index.ts";
import type {
	ConfirmRequest,
	ConfirmResponse,
	RideDomainList,
} from "./types/rides";
import type {
	EstimateRequest,
	EstimateResponse,
	RideEstimateDomainItem,
} from "./types/estimate/index.ts";

class RideService {
	private readonly httpClient: HttpClient;

	constructor() {
		this.httpClient = new HttpClient("http://localhost:8080/rides");
	}

	async list(id: string, driver_id?: number): Promise<RideDomainList> {
		const response = await this.httpClient.get<RideListResponse>(
			`/list/${id}?driver_id=${driver_id}`,
		);
		return RideMapper.toDomainList(response);
	}

	async estimate(
		estimateRequest: EstimateRequest,
	): Promise<RideEstimateDomainItem> {
		const response = await this.httpClient.post<EstimateResponse>(
			"/estimate",
			estimateRequest,
		);
		return RideMapper.toDomainEstimate(response);
	}

	async confirm(confirmRequest: ConfirmRequest): Promise<ConfirmResponse> {
		const body = RideMapper.toPersistence(confirmRequest);
		return this.httpClient.post<ConfirmResponse>("/confirm", body);
	}
}

export default new RideService();
