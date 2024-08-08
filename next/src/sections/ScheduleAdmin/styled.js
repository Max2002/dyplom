import styled from 'styled-components';
import Link from 'next/link';

export const Wrapper = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${({ back }) => back && '93%'};
  background: ${({ back }) => back && '#bf8c6f'};
  border-radius: 15px;
  padding: 10px;

  @media (max-width: 992px) {
    overflow-x: scroll;
    justify-content: start;
    align-items: unset;

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

export const DownloadFile = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: end;
  color: #fff;
  font-weight: bold;
  margin: 0 40px 40px 0;
  font-size: 16px;
  transition: all 0.3s ease-out;

  &:hover {
    text-shadow: 11px 4px 2px #000;
    font-size: 18px;
  }
`;
