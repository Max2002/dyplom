import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { GiCheckMark } from 'react-icons/gi';
import { useState } from 'react';
import TextField from '@/components/TextField';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import { registration } from '@/redux/actionCreator/getUser';
import { getCollection } from '@/redux/actionCreator/getCollection';
import {
  FlexButton,
  IsOwner,
  Checkbox,
  Invalid,
} from '@/sections/Header/styled';

export default function FormRegister({ onClose, setIsAuth, dispatch }) {
  const [isOwner, setIsOwner] = useState(false);
  const [invalid, setInvalid] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      surname: '',
      name: '',
      fatherName: '',
      birthday: '',
      email: '',
      phone: '',
      username: '',
      password: '',
      repeatPassword: '',
    },
  });

  const onSubmit = async (data) => {
    const { password, repeatPassword } = data;

    if (password === repeatPassword) {
      delete data.repeatPassword;
      const { status, idOrg } = await dispatch(registration(data, isOwner));

      if (status) {
        if (idOrg) {
          dispatch(getCollection(`/api/get-news/${idOrg}`));
        }
        setIsAuth(true);
        onClose();
      } else {
        setInvalid('Ця почта або нікнейм вже зайняті');
      }
    } else {
      setInvalid('Паролі не співпадають');
    }
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="text"
          label="Прізвище"
          register={register('surname', {
            required: 'Обов`язкове поле!',
          })}
          name="surname"
          error={errors.surname && errors.surname.message}
        />
        <TextField
          type="text"
          label="Ім'я"
          register={register('name', {
            required: 'Обов`язкове поле!',
          })}
          name="name"
          error={errors.name && errors.name.message}
        />
        <TextField
          type="text"
          label="По батькові"
          register={register('fatherName', {
            required: 'Обов`язкове поле!',
          })}
          name="fatherName"
          error={errors.fatherName && errors.fatherName.message}
        />
        <TextField
          type="date"
          label="Ваш день народження"
          register={register('birthday', {
            required: 'Обов`язкове поле!',
          })}
          name="birthday"
          error={errors.birthday && errors.birthday.message}
        />
        <TextField
          type="text"
          label="Нікнейм"
          register={register('username', {
            required: 'Обов`язкове поле!',
          })}
          name="nickname"
          error={errors.username && errors.username.message}
        />
        <TextField
          type="email"
          label="Електрона почта"
          register={register('email', {
            required: 'Обов`язкове поле!',
          })}
          name="email"
          error={errors.email && errors.email.message}
        />
        <TextField
          type="text"
          label="Номер телефону"
          register={register('phone', {
            required: 'Обов`язкове поле!',
            pattern: {
              value: /\d{4}\d{2}\d{2}\d{2}$/,
              message: 'Номер введено не коректно',
            },
          })}
          name="phone"
          error={errors.phone && errors.phone.message}
          prefix="+38"
          maxLength={10}
        />
        <TextField
          type="password"
          label="Пароль"
          register={register('password', {
            required: 'Обов`язкове поле!',
            pattern: {
              value: /^(?=.*\d)(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,16}$/,
              message:
                'Пароль повинен: бути не менше 8 і не більше 16 символів, перший символ літера або цифра, ' +
                'містити хоча б один спеціальний символ',
            },
          })}
          name="password"
          error={errors.password && errors.password.message}
        />
        <TextField
          type="password"
          label="Повторіть пароль"
          register={register('repeatPassword', {
            required: 'Обов`язкове поле!',
          })}
          name="repeatPassword"
          error={errors.repeatPassword && errors.repeatPassword.message}
        />
        <IsOwner onClick={() => setIsOwner(!isOwner)}>
          <Checkbox isOwner={isOwner}>
            <GiCheckMark size={20} color="#fff" />
          </Checkbox>
          <div>
            Встановіть галочку якщо хочете створити аккаунт власника бізнесу
          </div>
        </IsOwner>
        <FlexButton>
          <Button name="signUpRequest" type="submit">
            Зареєструватися
          </Button>
        </FlexButton>
      </form>
      {invalid && <Invalid>{invalid}</Invalid>}
    </Modal>
  );
}

FormRegister.propTypes = {
  onClose: PropTypes.func.isRequired,
  setIsAuth: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};
