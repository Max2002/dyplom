import styled from 'styled-components';

export const DropImage = styled.div`
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

export const Notification = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  margin: 20px 0;
`;

export const FileName = styled.div`
  color: #40282c;
  font-weight: bold;
  margin-bottom: 20px;
`;
