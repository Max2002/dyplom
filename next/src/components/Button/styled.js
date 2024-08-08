import styled from 'styled-components';

const ButtonStyle = styled.button`
  color: #fff;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: bold;

  &:disabled {
    color: gray;

    &:hover {
      color: gray;
      box-shadow: unset;
      border-radius: unset;
      cursor: no-drop;
    }
  }

  ${({ active }) =>
    active &&
    `
    color: #40282c;
    box-shadow: inset 0 0 2px 2px #fff;
    border-radius: 8px;
  `}

  &:hover {
    color: #40282c;
    box-shadow: inset 0 0 2px 2px #fff;
    border-radius: 8px;
  }
`;

export default ButtonStyle;
