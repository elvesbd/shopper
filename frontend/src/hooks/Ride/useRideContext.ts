import { useContext } from "react";
import { RideContext } from "../../contexts/Ride/RideContext";

export const useRideContext = () => {
	const context = useContext(RideContext);
	if (!context) {
		throw new Error("useRideContext must be used within a RideProvider");
	}
	return context;
};
