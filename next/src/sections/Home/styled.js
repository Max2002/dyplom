import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

export const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px 0;
  height: 100%;
`;

export const CardNews = styled(Link)`
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 25px;
  margin: 15px;
  box-shadow: 10px 10px 10px #8c5b49;
  background: ${({ src }) => (src ? 'none' : '#40282c')};
  cursor: pointer;

  @media (max-width: 375px) {
    width: 280px;
  }
`;

export const CardImage = styled(Image)`
  border-radius: 25px;
  filter: brightness(60%);
  object-fit: cover;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  z-index: 2;
  padding: 5px;
  width: 300px;
  height: 300px;

  h2 {
    color: #ffaa0d;
    margin-bottom: 10px;
    text-align: center;

    @media (max-width: 375px) {
      font-size: 18px;
    }
  }

  p {
    text-align: center;
    width: 290px;
    height: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #fff;
    font-size: 16px;

    @media (max-width: 375px) {
      width: 240px;
      font-size: 14px;
    }
  }

  span {
    color: #fff;
  }

  @media (max-width: 375px) {
    width: 250px;
    font-size: 12px;
  }
`;

export const NoData = styled.div`
  width: 100%;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
`;
