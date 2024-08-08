import PropTypes from 'prop-types';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import Notification from '@/components/Notification';
import Wrapper from '@/components/StatusRequest/styled';

export default function StatusRequest({ close, message }) {
  return (
    <Modal onClose={() => close()} position="center">
      <Wrapper>
        <Notification fontSize={18} width="300px" textAlign="center">
          {message}
        </Notification>
        <Button name="confirmReq" onClick={() => close()}>
          Ok
        </Button>
      </Wrapper>
    </Modal>
  );
}

StatusRequest.propTypes = {
  close: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};
