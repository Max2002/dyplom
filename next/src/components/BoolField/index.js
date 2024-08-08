import { GiCheckMark } from 'react-icons/gi';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Wrapper, Label, Error } from '@/components/BoolField/styled';

export default function BoolField({ label, name, register, error, setValue }) {
  const [handleFlag, setHandleFlag] = useState(true);

  useEffect(() => setValue(name, handleFlag), [handleFlag]);

  return (
    <>
      <Wrapper onClick={() => setHandleFlag(!handleFlag)}>
        <Checkbox isOwner={handleFlag}>
          <GiCheckMark size={20} color="#fff" />
        </Checkbox>
        <Label>{label}</Label>
        <input type="text" {...register} />
      </Wrapper>
      {error && <Error>{error}</Error>}
    </>
  );
}

BoolField.defaultProps = {
  register: {},
  error: null,
};

BoolField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.object,
  error: PropTypes.string,
  setValue: PropTypes.func.isRequired,
};
