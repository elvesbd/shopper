import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import RideService from "../../../services/RideService";
import type { RideBase } from "../../../services/types/rides";
import { handleError } from "../../../services/utils/hsndleError";

const useList = () => {
	const navigate = useNavigate();
	const { customer_id } = useParams<{ customer_id: string }>();

	const [userId, setUserId] = useState("");
	const [loading, setLoading] = useState(false);
	const [rides, setRides] = useState<RideBase[]>([]);
	const [selectedDriver, setSelectedDriver] = useState<number | undefined>();

	const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserId(e.target.value);
	};

	const resetFilters = () => {
		setRides([]);
		setSelectedDriver(undefined);
	};

	const fetchRides = async (customerId: string, driverId?: number) => {
		setLoading(true);
		try {
			const { rides } = await RideService.list(customerId, driverId);

			if (rides.length === 0) resetFilters();

			setRides(
				driverId ? rides.filter((ride) => ride.driver.id === driverId) : rides,
			);
		} catch (error) {
			handleError(error);
		} finally {
			setLoading(false);
		}
	};

	const applyFilter = () => {
		resetFilters();

		const customerId = userId || customer_id;
		if (customerId) fetchRides(customerId, selectedDriver);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (customer_id) fetchRides(customer_id);
	}, [customer_id]);

	return {
		rides,
		userId,
		loading,
		navigate,
		setUserId,
		applyFilter,
		selectedDriver,
		setSelectedDriver,
		handleUserIdChange,
	};
};

export default useList;
