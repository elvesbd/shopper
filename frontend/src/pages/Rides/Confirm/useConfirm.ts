import { useNavigate } from "react-router-dom";

import RideService from "../../../services/RideService";
import { handleError } from "../../../services/utils/hsndleError";
import { useEstimateContext } from "../../../hooks/Estimate/useEstimateContext";

const useConfirm = () => {
	const navigate = useNavigate();
	const { estimate } = useEstimateContext();

	const origin = estimate.origin;
	const drivers = estimate.drivers;
	const destination = estimate.destination;
	const duration = estimate.routeResponse.duration;
	const distance = estimate.routeResponse.distanceMeters;
	const encodedPolyline = estimate.routeResponse.polyline.encodedPolyline;

	const handleRequest = async (
		value: string,
		driver: { id: number; name: string },
	) => {
		try {
			const origin = localStorage.getItem("origin") ?? "";
			const customer_id = localStorage.getItem("customer_id") ?? "";
			const destination = localStorage.getItem("destination") ?? "";

			await RideService.confirm({
				value,
				origin,
				driver,
				distance,
				duration,
				customer_id,
				destination,
			});
			navigate(`/list/${customer_id}`);
		} catch (error) {
			handleError(error);
		}
	};

	return { encodedPolyline, origin, destination, handleRequest, drivers };
};

export default useConfirm;
