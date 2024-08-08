import PropTypes from 'prop-types';
import { ModalStyle, Close, Content } from '@/components/Modal/styled';

export default function Modal({ children, onClose, position }) {
  return (
    <ModalStyle position={position}>
      <Close onClick={onClose} color="#fff" />
      <Content>{children}</Content>
    </ModalStyle>
  );
}

Modal.defaultProps = {
  position: 'default',
};

Modal.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  onClose: PropTypes.func.isRequired,
  position: PropTypes.string,
};
