import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
`;

export const Background = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: url(${({ url }) => url}) no-repeat center center;
  background-size: cover;
  z-index: -1;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  max-width: 1320px;
  padding: 0 20px;
  flex: auto;
  width: 100%;

  @media (min-width: 0) and (max-width: 1200px) {
    margin: 0 auto;
  }

  @media (max-width: 1200px) {
    width: 1024px;
  }

  @media (max-width: 1024px) {
    width: 992px;
  }

  @media (max-width: 992px) {
    width: 768px;
  }

  @media (max-width: 768px) {
    width: 576px;
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`;
