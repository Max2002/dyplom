import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import TextField from '@/components/TextField';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import { auth } from '@/redux/actionCreator/getUser';
import { FlexButton, Invalid } from '@/sections/Header/styled';
import { getCollection } from '@/redux/actionCreator/getCollection';

export default function FormAuth({ onClose, setIsAuth, dispatch }) {
  const [invalid, setInvalid] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async ({ email, password }) => {
    const { status, idOrg } = await dispatch(auth(email, password));

    if (status) {
      if (idOrg) {
        dispatch(getCollection(`/api/get-news/${idOrg}`));
      }
      setIsAuth(true);
      onClose();
    } else {
      setInvalid(true);
    }
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="text"
          label="Електрона почта або нікнейм"
          register={register('email', {
            required: 'Обов`язкове поле!',
          })}
          name="email"
          error={errors.email && errors.email.message}
        />
        <TextField
          type="password"
          label="Пароль"
          register={register('password', {
            required: 'Обов`язкове поле!',
          })}
          name="password"
          error={errors.password && errors.password.message}
        />
        <FlexButton>
          <Button name="authRequest" type="submit">
            Увійти
          </Button>
        </FlexButton>
      </form>
      {invalid && (
        <Invalid>
          Логін або пароль не вірні, спробуйте іще раз та перевірте правельність
          введеня
        </Invalid>
      )}
    </Modal>
  );
}

FormAuth.propTypes = {
  onClose: PropTypes.func.isRequired,
  setIsAuth: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};
