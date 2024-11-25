import { createContext, type ReactNode, useMemo, useState } from "react";

// Tipo para a estimativa
interface Estimate {
	origin: {
		latitude: number;
		longitude: number;
	};
	destination: {
		latitude: number;
		longitude: number;
	};
	distance: string;
	duration: string;
	drivers: Array<{
		id: number;
		name: string;
		description: string;
		vehicle: string;
		review: {
			rating: number;
			comment: string;
		};
		value: string;
	}>;
	routeResponse: {
		distanceMeters: number;
		duration: string;
		polyline: {
			encodedPolyline: string;
		};
	};
}

// Tipo do contexto
interface EstimateContextType {
	estimate: Estimate;
	setEstimate: (data: Estimate) => void;
}

interface EstimateProviderProps {
	children: ReactNode;
}

// Criação do contexto
export const EstimateContext = createContext<EstimateContextType | undefined>(
	undefined,
);

// Provedor do contexto
export const EstimateProvider = ({ children }: EstimateProviderProps) => {
	const [estimate, setEstimate] = useState<Estimate>({} as Estimate);

	const value = useMemo(() => ({ estimate, setEstimate }), [estimate]);

	return (
		<EstimateContext.Provider value={value}>
			{children}
		</EstimateContext.Provider>
	);
};
