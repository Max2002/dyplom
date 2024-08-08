import styled from 'styled-components';

export const Table = styled.table`
  border-collapse: collapse;
`;

export const Row = styled.tr`
  background: ${({ index }) => (index ? '#d96f2d' : 'rgba(64, 40, 44, 0.4)')};
`;

export const Cell = styled.td`
  padding: 10px;
  color: #fff;
  text-align: center;
  font-size: 14px;
  opacity: ${({ opacity }) => (opacity ? 0 : 1)};
  font-weight: ${({ fontWeight }) => fontWeight && 'bold'};

  ${({ textShadow }) =>
    textShadow &&
    `
    text-shadow: 3px 2px 2px #000;
    font-size: 16px;
  `};

  ${({ back }) =>
    back &&
    `
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  `};

  @media (max-width: 1200px) {
    font-size: 12px;
  }
`;
