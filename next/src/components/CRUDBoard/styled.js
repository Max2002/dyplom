import styled from 'styled-components';

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

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
`;

export const Table = styled.table`
  position: relative;
  width: 100%;
`;

export const Row = styled.tr`
  td {
    padding-bottom: 20px;

    ${({ index }) =>
      index === 0 &&
      `
      color: #fff;
      font-size: 18px;
      text-transform: capitalize;
      
      svg {
        cursor: pointer;
        transition: all .5s ease-out;
        
        &:hover {
          transform: rotate(360deg);
        }
      }
      
      
      &:last-child {
        text-align: center;
      }
    `}
  }

  td:not(:last-child) {
    padding-right: 20px;
  }

  div:not(:last-child),
  img {
    margin-right: 20px;
  }
`;

export const Media = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 10px;
  object-fit: cover;
`;

export const Functions = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
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

export const EmptyData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > svg {
    cursor: pointer;
    transition: all 0.5s ease-out;
    margin-top: 30px;

    &:hover {
      transform: rotate(360deg);
    }
  }
`;
