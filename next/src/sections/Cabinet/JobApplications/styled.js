import styled from 'styled-components';

export const Wrapper = styled.div`
  table {
    width: 100%;
  }
`;

export const Row = styled.tr`
  ${({ first }) =>
    first &&
    `
    color: #fff;
    font-weight: bold;
    font-size: 18px;
  `}

  td:not(:last-child) {
    padding-right: 20px;
  }
`;

export const Cell = styled.td`
  padding-bottom: 20px;

  ${({ functions }) =>
    functions &&
    `
    svg {
    cursor: pointer;
    transition: all 0.3s ease-out;

      &:hover {
        transform: rotate(30deg);
      }
    }

    svg:first-child {
      margin-right: 20px;
    }
  `}
`;

export const Question = styled.div`
  text-align: center;
  font-size: 18px;
  color: #fff;
`;

export const Answers = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  button {
    font-size: 16px;
  }
`;
