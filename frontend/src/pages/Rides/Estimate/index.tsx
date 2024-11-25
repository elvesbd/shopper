import useEstimate from "./useEstimate";
import { Button, Card, Container, Input } from "./EstimateStyled";

function Estimate() {
	const {
		origin,
		loading,
		setOrigin,
		customerId,
		destination,
		setCustomerId,
		handleRequest,
		setDestination,
	} = useEstimate();

	return (
		<Container>
			<h2>Solicitação de Viagem</h2>
			<Card>
				<Input
					type="text"
					placeholder="ID do Usuário"
					value={customerId}
					onChange={(e) => setCustomerId(e.target.value)}
				/>
				<Input
					type="text"
					placeholder="Endereço de Origem"
					value={origin}
					onChange={(e) => setOrigin(e.target.value)}
				/>
				<Input
					type="text"
					placeholder="Endereço de Destino"
					value={destination}
					onChange={(e) => setDestination(e.target.value)}
				/>
				<Button
					type="button"
					disabled={loading}
					onClick={() => handleRequest(customerId, origin, destination)}
				>
					{loading ? "Calculando..." : "Estimar Valor"}
				</Button>
			</Card>
		</Container>
	);
}

export default Estimate;
