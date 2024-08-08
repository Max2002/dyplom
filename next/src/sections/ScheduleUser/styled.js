import styled from 'styled-components';
import Link from 'next/link';

export const Wrapper = styled.div`
  display: flex;
  height: 93%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  margin-top: 20px;
  padding: 20px;
  border-radius: 15px;

  @media (max-width: 992px) {
    overflow-x: scroll;
    align-items: start;

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

export const Header = styled.div`
  font-size: 24px;
  color: #fff;
  text-shadow: 11px 4px 2px #000;
  margin-bottom: 20px;

  span {
    font-weight: bold;
  }

  @media (max-width: 992px) {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const Table = styled.div`
  color: #fff;

  table {
    margin-bottom: 20px;
  }

  &:not(:last-child) {
    margin-bottom: 40px;
  }
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin: 20px 0;
`;

export const DownloadFile = styled(Link)`
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease-out;
  color: #fff;

  &:hover {
    box-shadow: inset 0 0 5px #fff;
    padding: 10px;
    border-radius: 5px;
    text-shadow: 11px 4px 2px #000;
  }
`;

export const Filter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;

  & > div {
    margin-right: 20px;
  }
`;
