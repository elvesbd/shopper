import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 1000px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
`;

export const Select = styled.select`
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
`;

export const TripsList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  width: 100%;
  max-width: 1000px;
  margin-top: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  table-layout: fixed;
`;

export const Th = styled.th`
  padding: 12px 15px;
  text-align: left;
  background-color: #f4f4f4;
  font-weight: bold;
`;

export const Td = styled.td`
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
`;

export const TrHover = styled.tr`
  &:hover {
    background-color: #f9f9f9;
  }
`;

export const Button = styled.button`
  padding: 10px 15px;
  font-size: 14px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export const NewTripButton = styled.button`
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 14px;
  background: none;
  color: #007bff;
  border: none;
  cursor: pointer;
  padding: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

