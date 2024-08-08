import styled from 'styled-components';

export const UserStyle = styled.div`
  background: #bf8c6f;
  border-radius: 16px;
  padding: 20px;
  margin: 20px 0;
  display: flex;
  justify-content: start;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Avatar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 40px;

  @media (max-width: 768px) {
    margin: 0 0 20px 0;
  }
`;

export const Photo = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 15px;
  background: url(${({ url }) => url}) no-repeat center center;
  background-size: cover;
`;

export const UserName = styled.div`
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;

export const MainInfo = styled.div``;

export const NodeInfo = styled.div`
  color: #40282c;
  font-size: 18px;
  font-weight: bold;

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  span {
    color: #fff;
    margin: 0 10px;
    font-size: 16px;
  }

  @media (max-width: 576px) {
    font-size: 16px;

    span {
      font-size: 14px;
    }
  }
`;

export const SalaryInfo = styled.div``;

export const TitleSalary = styled.h2`
  color: #fff;
  margin-bottom: 20px;
`;

export const ChoosePosition = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin-top: 20px;
  }
`;

export const AnswersButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    color: #fff;
    padding: 12px 16px;
    font-weight: bold;

    &:hover {
      color: #40282c;
      box-shadow: inset 0 0 2px 2px #fff;
      border-radius: 8px;
    }
  }

  button,
  a {
    font-size: 18px;
  }
`;
