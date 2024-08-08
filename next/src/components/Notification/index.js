import NotificationStyle from '@/components/Notification/styled';
import PropTypes from 'prop-types';

export default function Notification({ children, fontSize, textAlign, width }) {
  return (
    <NotificationStyle textAlign={textAlign} width={width} fontSize={fontSize}>
      {children}
    </NotificationStyle>
  );
}

Notification.defaultProps = {
  fontSize: 16,
  textAlign: '',
  width: '',
};

Notification.propTypes = {
  children: PropTypes.string.isRequired,
  fontSize: PropTypes.number,
  textAlign: PropTypes.string,
  width: PropTypes.string,
};
