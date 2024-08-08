import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 93%;
  margin-top: 20px;
  border-radius: 15px;
  padding: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`;

export const Image = styled.div`
  width: 30%;
  height: 300px;
  background: url(${({ url }) => url}) no-repeat center center;
  background-size: cover;
  border-radius: 15px;

  @media (max-width: 768px) {
    width: 40%;
    margin-bottom: 20px;
  }

  @media (max-width: 576px) {
    width: 60%;
  }

  @media (max-width: 475px) {
    width: 80%;
  }
`;

export const Info = styled.div`
  width: 60%;
  color: #fff;
  font-weight: bold;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Title = styled.div`
  font-size: 28px;
  text-shadow: 11px 4px 2px #000;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const Description = styled.div`
  font-size: 18px;
  margin: 40px 0 20px 0;
`;
