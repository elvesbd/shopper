import { useState } from "react";
import { useNavigate } from "react-router-dom";

import RideService from "../../../services/RideService";
import { handleError } from "../../../services/utils/hsndleError";
import { useEstimateContext } from "../../../hooks/Estimate/useEstimateContext";
import {
	removeFromLocalStorage,
	saveToLocalStorage,
} from "../../../services/utils/localStorageUtil";
import type { RideEstimateDomainItem } from "../../../services/types/estimate";

const useEstimate = () => {
	const navigate = useNavigate();
	const { setEstimate } = useEstimateContext();

	const [origin, setOrigin] = useState("");
	const [loading, setLoading] = useState(false);
	const [customerId, setCustomerId] = useState("");
	const [destination, setDestination] = useState("");

	const handleAfterEstimate = (
		origin: string,
		customerId: string,
		destination: string,
		estimateResponse: RideEstimateDomainItem,
	) => {
		saveToLocalStorage("origin", origin);
		saveToLocalStorage("customer_id", customerId);
		saveToLocalStorage("destination", destination);

		setOrigin("");
		setCustomerId("");
		setDestination("");

		setEstimate(estimateResponse);

		navigate("/confirm");
	};

	const handleRequest = async (
		customerId: string,
		origin: string,
		destination: string,
	) => {
		setLoading(true);

		removeFromLocalStorage("origin");
		removeFromLocalStorage("customer_id");
		removeFromLocalStorage("destination");

		try {
			const estimateResponse = await RideService.estimate({
				origin,
				destination,
				customer_id: customerId,
			});
			setLoading(false);
			handleAfterEstimate(origin, customerId, destination, estimateResponse);
		} catch (error) {
			setLoading(false);
			handleError(error);
		}
	};

	return {
		origin,
		loading,
		setOrigin,
		customerId,
		destination,
		setCustomerId,
		handleRequest,
		setDestination,
	};
};

export default useEstimate;
