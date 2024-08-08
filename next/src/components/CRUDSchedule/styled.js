import styled from 'styled-components';
import Link from 'next/link';

export const DownloadFile = styled(Link)`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  margin-top: 20px;
  transition: all 0.3s ease-out;

  &:hover {
    font-size: 18px;
    text-shadow: 11px 4px 2px #000;
  }
`;

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

export const FormAdd = styled.form`
  & > div {
    margin-top: 20px;
  }
`;

export const Headers = styled.tr`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  margin-top: 20px;
`;

export const Table = styled.table`
  width: 100%;
  margin-top: 20px;

  td {
    padding: 0 10px 10px 0;
  }
`;

export const WrapperData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;

  @media (max-width: 768px) {
    align-items: unset;
  }
`;
