import { useContext } from "react";
import { EstimateContext } from "../../contexts/Estimate/EstimateContext";

// Hook para usar o contexto
export const useEstimateContext = () => {
	const context = useContext(EstimateContext);
	if (!context) {
		throw new Error(
			"useEstimateContext deve ser usado dentro de EstimateProvider",
		);
	}
	return context;
};
