import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 93%;
  margin-top: 20px;
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;

  @media (max-width: 1024px) {
    overflow-x: scroll;

    &::-webkit-scrollbar {
      height: 7px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #7c96a6;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: rgba(54, 110, 166, 0.7);
    }
  }
`;

export const Profit = styled.div`
  border-bottom: 3px solid #fff;
  padding-bottom: 10px;
  margin-bottom: 20px;
  color: #fff;

  div:first-child {
    font-weight: bold;
  }

  div:not(:first-child) {
    margin: 10px 20px 0;
  }
`;

export const ResultProfit = styled.div`
  color: #fff;
  font-weight: bold;
  text-shadow: 11px 4px 2px #000;
  margin-bottom: 20px;
`;

export const ChartStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1024px) {
    justify-content: start;
  }
`;
