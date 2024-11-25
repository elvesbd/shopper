import { useState, createContext, type ReactNode } from "react";

interface RideContextType {
	customerId: string | null;
	origin: string | null;
	destination: string | null;
	setRideData: (
		customerId: string,
		origin: string,
		destination: string,
	) => void;
}

interface RideProviderProps {
	children: ReactNode;
}

export const RideContext = createContext<RideContextType | undefined>(
	undefined,
);

// Criar o Provider para o contexto
export const RideProvider = ({ children }: RideProviderProps) => {
	const [customerId, setCustomerId] = useState<string | null>(null);
	const [origin, setOrigin] = useState<string | null>(null);
	const [destination, setDestination] = useState<string | null>(null);

	// Função para atualizar os dados de origem, destino e customer_id
	const setRideData = (
		customerId: string,
		origin: string,
		destination: string,
	) => {
		setCustomerId(customerId);
		setOrigin(origin);
		setDestination(destination);
	};

	return (
		<RideContext.Provider
			value={{ customerId, origin, destination, setRideData }}
		>
			{children}
		</RideContext.Provider>
	);
};
