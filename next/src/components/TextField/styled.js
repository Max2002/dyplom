import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-bottom: 30px;

  svg {
    cursor: pointer;
  }
`;

export const Label = styled.label`
  color: #545563;
  font-weight: 600;
  font-size: 12px;

  &:first-letter {
    text-transform: capitalize;
  }

  @media (max-width: 960px) {
    font-size: 16px;
  }
`;

export const WrapperField = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  border: 1px solid ${({ error }) => (error ? 'red' : '#C7C8D2')};
  background: transparent;
  border-radius: 8px;
  width: 100%;
  height: 56px;
  padding: 0 20px;
  font-size: 14px;
  line-height: 1.33;
  margin-top: 10px;

  &:focus-within {
    box-shadow: 5px 5px 10px #c7c8d2;
  }
`;

export const Input = styled.input`
  margin-left: 5px;
  width: ${({ isPrefix }) => (isPrefix ? '90%' : '100%')};
  font-size: 16px;
  background: transparent;
  color: #2b2b43;

  &:-webkit-autofill {
    -webkit-box-shadow: inset 0 0 0 50px white;
    -webkit-text-fill-color: black;
  }
`;

export const Error = styled.div`
  margin-top: 5px;
  font-size: 13px;
  color: red;
`;
