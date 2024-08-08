import styled from 'styled-components';
import Link from 'next/link';

export const HeaderStyle = styled.header`
  position: sticky;
  top: 0;
  background: #7c96a6;
  width: 100%;
  padding: 25px 20px;
  z-index: 999;

  @media (max-width: 1024px) {
    padding: 15px 20px;
  }
`;

export const Organisation = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const Logo = styled(Link)`
  width: 50px;
  height: 50px;
  background: #816262;
  border-radius: ${({ borderRadius }) => (borderRadius ? '50%' : 'unset')};
  margin-right: 30px;
  background: url(${({ logo }) => logo}) no-repeat center center;
  background-size: ${({ borderRadius }) => (borderRadius ? 'cover' : '45px')};

  @media (max-width: 1024px) {
    margin: 0 0 15px 0;
    width: 70px;
    height: 70px;
  }
`;

export const NameOrganisation = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: #f4f4f4;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const MainNode = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  transition: all 0.3s ease-out;

  @media (max-width: 1024px) {
    flex-direction: column;
    justify-content: start;
    height: ${({ height }) => height}px;
    overflow: hidden;
    margin-top: ${({ mobile }) => mobile && '20px'};
  }

  @media (max-width: 475px) {
    height: ${({ height }) => height && height + 30}px;
  }
`;

export const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const ButtonMobile = styled.div`
  width: 100%;
  display: none;
  justify-content: end;
  cursor: pointer;

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: end;
    height: 30px;
    width: 35px;

    span {
      display: block;
      height: 4px;
      background: #fff;
      border-radius: 5px;
      transition: all 0.3s ease-out;
    }

    span:nth-child(1) {
      width: 100%;
    }

    span:nth-child(2) {
      width: 75%;
    }

    span:nth-child(3) {
      width: 60%;
    }

    &:hover {
      span {
        width: 100%;
      }
    }
  }

  @media (max-width: 1024px) {
    display: flex;
  }
`;

export const Navigation = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1024px) {
    margin: 30px 0 20px 0;
  }

  @media (max-width: 425px) {
    flex-direction: column;

    li:not(:last-child) {
      margin-bottom: 20px;
    }
  }
`;

export const ItemLink = styled(Link)`
  color: #40282c;
  font-weight: bold;
  font-size: 16px;
  margin-right: 20px;
  transition: all 0.3s ease-out;

  &:hover {
    font-size: 18px;
    text-shadow: 11px 4px 2px #fff;
  }

  @media (max-width: 425px) {
    margin: 0;
  }
`;

export const UserData = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  cursor: pointer;
  position: relative;
  min-width: 180px;

  &:hover {
    .dropDown {
      height: 60px;
      transition: all 0.3s ease-out;
    }
  }

  @media (max-width: 1024px) {
    .dropDown {
      height: 60px;
    }
  }
`;

export const UserName = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-right: 20px;
  color: #d9d8d2;
`;

export const UserImage = styled.div`
  background: url(${({ url }) => url}) no-repeat center center;
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export const DropDown = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 180px;
  top: 100%;
  background: #e4dada;
  height: 0;
  overflow: hidden;
  transition: all 0.3s ease-out;

  a {
    display: flex;
    align-items: center;
    padding: 5px;
    cursor: pointer;

    span {
      margin-left: 10px;
    }

    &:hover span {
      color: red;
    }
  }

  @media (max-width: 1024px) {
    background: none;
    top: 120%;

    a {
      color: #fff;
    }
  }
`;

export const Cabinet = styled(Link)`
  border-bottom: 2px solid #fffafa;

  @media (max-width: 1024px) {
    border: unset;
  }
`;

export const Exit = styled(Link)``;

/** Form register * */
export const FlexButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
`;

export const IsOwner = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;
`;

export const Checkbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 10px;
  border: 2px solid #fff;
  margin-right: 10px;

  svg {
    transition: all 0.3s ease-out;
    opacity: ${({ isOwner }) => (isOwner ? 1 : 0)};
  }
`;

export const Invalid = styled.div`
  color: #fff;
  border-radius: 5px;
  background: #da2121;
  padding: 15px;
  text-align: center;
  margin-top: 10px;
`;
