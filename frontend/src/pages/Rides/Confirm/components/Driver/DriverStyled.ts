// src/components/Driver/DriverStyled.ts
import styled from "styled-components";

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

export const DriversCarousel = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 10px 0;
  gap: 10px;
  flex: 1;
  scrollbar-width: thin;
`;

export const DriverCardWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const DriverCard = styled.div`
  width: 372px;
  height: 200px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: left;
  overflow: hidden;
  flex-shrink: 0;
`;

export const DriverInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const DriverNameRating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const DriverName = styled.h3`
  font-size: 1.2rem;
  color: #2a7ade;
`;

export const DriverRating = styled.p`
  font-size: 0.9rem;
  color: #888;
`;

export const DriverPrice = styled.p`
  font-size: 1rem;
  color: #2a7ade;
  text-align: right;
  white-space: nowrap;
  font-weight: bolder;
  border: 1px;
`;

export const DriverDescription = styled.p`
  font-style: italic;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 0.8rem;
`;

export const DriverSelection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ChooseButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  width: auto;
  height: 42px;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;
