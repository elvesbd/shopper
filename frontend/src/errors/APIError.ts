import type { ApiErrorResponse } from "./types/ApiErrorResponse";

export class APIError extends Error {
	response: Response;
	body: ApiErrorResponse;

	constructor(response: Response, body: ApiErrorResponse) {
		super();
		this.name = "APIError";
		this.response = response;
		this.body = body;
		this.message =
			body?.error_description || `${response.status} - ${response.statusText}`;
	}
}
