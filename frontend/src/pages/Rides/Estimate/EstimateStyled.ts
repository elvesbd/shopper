import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	box-sizing: border-box;
`;

export const Card = styled.div`
	background-color: white;
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	width: 100%;
	max-width: 500px;
`;

export const Input = styled.input`
	padding: 10px;
	font-size: 16px;
	border-radius: 5px;
	border: 1px solid #ccc;
	margin-bottom: 10px;
	width: 100%;
	box-sizing: border-box;
`;

export const Button = styled.button`
	padding: 10px 20px;
	font-size: 16px;
	background-color: #4caf50;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	width: 100%;

	&:disabled {
		background-color: #ccc;
		cursor: not-allowed;
	}
`;
