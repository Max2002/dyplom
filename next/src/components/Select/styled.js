import styled from 'styled-components';

export const SelectStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border: 1px solid #d9d8d2;
  border-radius: 5px;
  padding: 5px 0;
  transition: all 0.3s ease-out;
  width: ${({ maxWidth }) => maxWidth && '100%'};
  color: ${({ color }) => color || '#000'};
  min-width: 200px;

  &:hover {
    border-radius: 5px 5px 0 0;

    .dropDown {
      height: ${({ height }) => height}px;
      border: 1px solid #d9d8d2;
      z-index: 999;
    }

    svg {
      transform: rotate(180deg);
    }
  }

  svg {
    margin: 0 10px;
    transition: all 0.3s ease-out;
  }
`;

export const Value = styled.div`
  padding: 0 20px;
  border-right: 1px solid #fff;
  flex-grow: 3;
  flex-basis: 0;
`;

export const DropDown = styled.div`
  position: absolute;
  top: 100%;
  height: 0;
  overflow: hidden;
  transition: all 0.3s ease-out;
  width: 100%;
  border-radius: 0 0 5px 5px;
  border: 0 solid #d9d8d2;
  background: ${({ back }) => back || 'transparent'};
  line-height: normal;
`;

export const Item = styled.div`
  cursor: pointer;
  padding: 5px 10px;

  &:hover {
    text-shadow: 2px 2px 5px #fff;
  }
`;
