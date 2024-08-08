import styled from 'styled-components';
import { MdOutlineClose } from 'react-icons/md';

export const ModalStyle = styled.div`
  ${({ position }) =>
    position === 'center' &&
    `
    display: flex;
    justify-content: center;
    align-items: center;
  `}
  position: fixed;
  inset: 0;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;

  &::-webkit-scrollbar {
    width: 0;
  }
  -ms-overflow-style: none;
`;

export const Close = styled(MdOutlineClose)`
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 991;
  width: 35px;
  height: 35px;
  cursor: pointer;
`;

export const Content = styled.div`
  z-index: 995;
  background: #bf8c6f;
  margin: 65px auto;
  max-width: 560px;
  padding: 40px;
  border-radius: 5px;
`;
