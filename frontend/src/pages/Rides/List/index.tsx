import {
	Td,
	Th,
	Label,
	Input,
	Table,
	Select,
	Button,
	TrHover,
	TripsList,
	Container,
	InputContainer,
	FilterContainer,
} from "./ListStyled";
import useList from "./useList";

const List = () => {
	const {
		rides,
		userId,
		applyFilter,
		selectedDriver,
		setSelectedDriver,
		handleUserIdChange,
	} = useList();

	return (
		<Container>
			<h2>Histórico de Viagens</h2>

			<FilterContainer>
				<InputContainer>
					<Label htmlFor="userId">ID do Usuário:</Label>
					<Input
						type="text"
						id="userId"
						value={userId}
						onChange={handleUserIdChange}
						placeholder="Informe o ID do usuário"
					/>
				</InputContainer>

				<InputContainer>
					<Label htmlFor="driver">Selecione o Motorista:</Label>
					<Select
						id="driver"
						value={selectedDriver ?? ""}
						onChange={(e) => {
							const driverId =
								e.target.value === ""
									? undefined
									: Number.parseInt(e.target.value);
							setSelectedDriver(driverId);
						}}
					>
						<option value="Todos">Todos</option>{" "}
						{rides?.map((ride) => (
							<option key={ride?.id} value={ride?.driver.id}>
								{ride?.driver.name}
							</option>
						))}
					</Select>
				</InputContainer>

				<Button onClick={() => applyFilter()}>Aplicar Filtro</Button>
			</FilterContainer>

			<TripsList>
				<Table>
					<thead>
						<tr>
							<Th style={{ width: "15%" }}>Data e Hora</Th>
							<Th style={{ width: "15%" }}>Motorista</Th>
							<Th style={{ width: "20%" }}>Origem</Th>
							<Th style={{ width: "20%" }}>Destino</Th>
							<Th style={{ width: "10%" }}>Distância</Th>
							<Th style={{ width: "10%" }}>Tempo</Th>
							<Th style={{ width: "10%" }}>Valor</Th>
						</tr>
					</thead>
					<tbody>
						{rides.map((ride) => (
							<TrHover key={ride.driver.id}>
								<Td>{ride.date}</Td>
								<Td>{ride.driver.name}</Td>
								<Td>{ride.origin}</Td>
								<Td>{ride.destination}</Td>
								<Td>{ride.distance}</Td>
								<Td>{ride.duration}</Td>
								<Td>{ride.value}</Td>
							</TrHover>
						))}
					</tbody>
				</Table>
			</TripsList>
		</Container>
	);
};

export default List;
