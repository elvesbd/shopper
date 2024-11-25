import styled from "styled-components";

export const MapContainer = styled.div`
	width: 100%;
	max-width: 1200px;
	margin: 20px auto;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid #e0e0e0;
	border-radius: 8px;
	padding: 10px;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
	background-color: #f9f9f9;
	max-height: 350px; /* Define uma altura máxima */
	overflow: hidden; /* Garante que o conteúdo extra seja ocultado */
`;

export const MapImage = styled.img`
	width: 100%;
	height: auto;
	border-radius: 8px;
	object-fit: cover;
`;
