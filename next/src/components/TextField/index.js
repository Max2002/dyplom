import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Wrapper, Label, WrapperField, Input, Error } from './styled';

export default function TextField({
  type,
  label,
  name,
  register,
  placeholder,
  prefix,
  maxLength,
  error,
}) {
  const [visible, setVisible] = useState(false);
  const suffix = visible ? (
    <FaEyeSlash size="1.2em" onClick={() => setVisible(false)} />
  ) : (
    <FaEye size="1.2em" onClick={() => setVisible(true)} />
  );

  return (
    <Wrapper>
      {label && <Label htmlFor={name}>{label}</Label>}
      <WrapperField type={type} error={error}>
        {prefix && prefix}
        <Input
          isPrefix={!!prefix}
          {...register}
          type={type === 'password' && visible ? 'text' : type}
          placeholder={placeholder}
          id={name}
          maxLength={maxLength}
          autoComplete="off"
        />
        {type === 'password' && suffix}
      </WrapperField>
      {error && <Error>{error}</Error>}
    </Wrapper>
  );
}

TextField.defaultProps = {
  label: null,
  prefix: null,
  placeholder: null,
  register: {},
  maxLength: null,
  error: null,
};

TextField.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  register: PropTypes.object,
  placeholder: PropTypes.string,
  prefix: PropTypes.node,
  maxLength: PropTypes.number,
  error: PropTypes.string,
};
