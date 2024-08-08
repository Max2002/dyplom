import styled from 'styled-components';

const NotificationStyle = styled.div`
  color: #fff;
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: bold;
  margin: 20px 0;
  text-align: ${({ textAlign }) => textAlign};
  width: ${({ width }) => width};

  @media (max-width: 576px) {
    width: 200px;
  }
`;

export default NotificationStyle;
