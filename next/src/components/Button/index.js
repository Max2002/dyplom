import PropTypes from 'prop-types';
import ButtonStyle from '@/components/Button/styled';

export default function Button({
  type,
  name,
  onClick,
  active,
  children,
  disabled,
}) {
  return (
    <ButtonStyle
      name={name}
      type={type}
      onClick={onClick}
      active={active}
      disabled={disabled}
    >
      {children}
    </ButtonStyle>
  );
}

Button.defaultProps = {
  type: 'button',
  active: false,
  disabled: false,
  onClick: () => {},
};

Button.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};
