import axios, {
	type AxiosInstance,
	type AxiosResponse,
	type AxiosRequestConfig,
} from "axios";

interface ApiErrorResponse {
	error_code: string;
	error_description: string;
}

class HttpClient {
	private readonly client: AxiosInstance;

	constructor(baseURL: string) {
		this.client = axios.create({
			baseURL,
			headers: {
				"Content-Type": "application/json",
			},
		});

		this.client.interceptors.response.use(
			(response: AxiosResponse) => response,
			(error) => {
				if (error.response) {
					const { error_code, error_description } = error.response
						.data as ApiErrorResponse;
					console.error(
						`API Error - Code: ${error_code}, Description: ${error_description}`,
					);
				}
				return Promise.reject(error);
			},
		);
	}

	async get<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
		try {
			const response = await this.client.get<T>(url, config);
			return response.data;
		} catch (error) {
			this.handleError(error);
			throw error;
		}
	}

	async post<T>(
		url: string,
		data: any,
		config: AxiosRequestConfig = {},
	): Promise<T> {
		try {
			const response = await this.client.post<T>(url, data, config);
			return response.data;
		} catch (error) {
			this.handleError(error);
			throw error;
		}
	}

	private handleError(error: any): void {
		if (error.response) {
			const { error_code, error_description } = error.response
				.data as ApiErrorResponse;
			console.error(`Error: ${error_code} - ${error_description}`);
		} else {
			console.error("Error:", error.message);
		}
	}
}

export default HttpClient;
