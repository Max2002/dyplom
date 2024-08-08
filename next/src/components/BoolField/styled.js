import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;

  input {
    opacity: 0;
  }
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

export const Label = styled.div`
  text-transform: capitalize;
  color: #fff;
`;

export const Error = styled.div`
  margin-top: 5px;
  font-size: 14px;
  color: red;
`;
