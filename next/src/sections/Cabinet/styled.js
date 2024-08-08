import styled from 'styled-components';
import Link from 'next/link';

export const Content = styled.div`
  padding: 20px;
  color: #000;
  font-weight: bold;
  border-radius: 16px;
  background: #bf8c6f;
  margin: 20px 0;
  width: 100%;

  @media (min-width: 1200px) {
    max-width: 1320px;
  }

  @media (max-width: 768px) {
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

export const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 30px;
`;

export const LabelAvatar = styled.div`
  margin-bottom: 10px;

  @media (max-width: 578px) {
    text-align: center;
  }
`;

export const NodeAvatar = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;

  button {
    margin-bottom: 20px;
  }

  @media (max-width: 578px) {
    flex-direction: column;
  }

  @media (max-width: 375px) {
    & > div {
      display: flex;
      flex-direction: column;
      align-items: initial;
      width: 100%;
    }

    button {
      margin-bottom: 0;
    }
  }
`;

export const EmptyOrg = styled.div`
  color: #fff;
  font-weight: bold;
  font-size: 14px;
`;

export const Avatar = styled.div`
  border-radius: 24px;
  width: 150px;
  height: 150px;
  margin-right: 30px;
  background: url(${({ src }) => src}) no-repeat center center;
  background-size: cover;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0);
    width: 100%;
    height: 100%;
    border-radius: 24px;
    transition: all 0.3s ease-out;
    background: ${({ isAvatar }) =>
      isAvatar ? 'none' : 'rgba(255, 255, 255, 0.4)'};

    svg {
      opacity: ${({ isAvatar }) => (isAvatar ? 0 : 1)};
    }
  }

  &:hover {
    cursor: pointer;

    div {
      background: rgba(255, 255, 255, 0.4);

      svg {
        opacity: 1;
      }
    }
  }

  @media (max-width: 578px) {
    margin: 0 0 10px 0;
  }
`;

export const Form = styled.form`
  margin-top: 30px;
  ${({ size }) => size && `width: ${size}px`}
`;

export const Fields = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;

  & > div {
    flex: 1 1 calc(50% - 10px);
    margin: 5px;
  }

  @media (max-width: 578px) {
    & > div {
      flex: 1 calc(100% - 10px);
    }
  }
`;

export const Functions = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const AdminFunc = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 2px solid #fff;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

// DELETE PROFILE
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

// ACTION AVATAR
export const DropAvatar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px dotted #fff;
  border-radius: 24px;
  width: 450px;
  height: 300px;
  margin-bottom: 20px;
  position: relative;

  input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`;

export const FileName = styled.div`
  color: #40282c;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// USERS
export const WrapperField = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  border: 2px solid #fff;
  margin-bottom: 20px;
`;

export const SearchUsersField = styled.input`
  padding: 5px 5px 5px 10px;
  width: 85%;
  font-size: 16px;
  color: #fff;
`;

export const SearchButton = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  border-left: 2px solid #fff;
  color: #fff;
`;

export const UserSearch = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 30px;
  }

  @media (max-width: 576px) {
    flex-direction: column;
    justify-content: center;
  }

  svg {
    cursor: pointer;
    transition: all 0.3s ease-out;

    &:hover {
      transform: rotate(30deg);
    }
  }
`;

export const OrganisationSearch = styled(Link)`
  display: flex;
  justify-content: start;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 30px;
  }
`;

export const OrganisationName = styled.div`
  font-size: 22px;
  text-shadow: 11px 4px 2px #000;
  color: #fff;
  margin-left: 20px;
`;

export const AvatarSearch = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 15px;
  background: url(${({ img }) => img}) no-repeat center center;
  background-size: cover;

  @media (max-width: 576px) {
    margin-bottom: 20px;
  }
`;

export const MainInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 10px;
  color: #fff;

  div:not(:last-child) {
    margin-right: 20px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;

    div:not(:last-child) {
      margin: 0 0 20px 0;
    }
  }

  @media (max-width: 576px) {
    margin-bottom: 20px;
  }
`;

export const SubInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;

  div:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export const Answer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div {
    font-size: 18px;
    color: #fff;
    font-weight: bold;
    text-align: center;
    line-height: 1.5;
    margin-bottom: 20px;
  }

  button {
    font-size: 18px;
  }
`;

export const NameOrg = styled.span`
  font-family: 'Nunito', sans-serif;
  font-size: 20px;
  color: #fff;
  margin-right: 5px;
  animation: neon-glow 1s ease-in-out infinite alternate;

  @keyframes neon-glow {
    from {
      text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ff00de;
    }
  }
`;

export const UserOrg = styled(Link)`
  display: flex;
  justify-content: start;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

// PERSONAL INFORMATION IN ORGANISATION
export const Header = styled.div`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;

  span {
    animation: neon-glow 1.5s ease-in-out infinite alternate;

    @keyframes neon-glow {
      from {
        text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff,
          0 0 40px #ff00de;
      }
    }
  }
`;

export const Position = styled.div``;

export const NodeInfo = styled.div`
  color: #40282c;
  font-size: 18px;
  font-weight: bold;

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  span {
    color: #fff;
    margin-left: 10px;
    font-size: 16px;
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
