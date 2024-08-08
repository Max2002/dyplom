import styled from 'styled-components';

export const Main = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #40282c;
  color: #fff;
  width: 100%;
  padding: 25px 0;

  @media (max-width: 578px) {
    flex-direction: column;
    align-items: center;
    font-size: 14px;
  }
`;

export const Middle = styled.span`
  margin: 0 3px;

  @media (max-width: 578px) {
    margin: 3px 0;
  }
`;
