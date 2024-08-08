import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import apiRequest from '@/api/api';
import TextField from '@/components/TextField';
import Button from '@/components/Button';
import { Fields, Form, Functions } from '@/sections/Cabinet/styled';
import { getUser } from '@/redux/actionCreator/getUser';
import { ERROR } from '@/constants/messages';

export default function ChangeInfo({ user, dispatch, setMessage, token }) {
  const { id, surname, name, fatherName, birthday, email, phone, username } =
    user;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      surname,
      name,
      fatherName,
      birthday,
      email,
      phone,
      username,
    },
  });

  const setDefaultValue = () => {
    setValue('name', name);
    setValue('surname', surname);
    setValue('fatherName', fatherName);
    setValue('birthday', birthday);
    setValue('email', email);
    setValue('phone', phone);
    setValue('username', username);
  };

  useEffect(() => setDefaultValue(), [user]);

  const onSubmit = async (data) => {
    try {
      await apiRequest.put(`/api/users/${id}`, data);

      setMessage('Дані успішно оновлено)');
      dispatch(getUser(token));
    } catch (e) {
      setMessage(ERROR);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Fields>
        <TextField
          type="text"
          label="Нікнейм"
          register={register('username', {
            required: 'Обов`язкове поле!',
          })}
          name="username"
          error={errors.username && errors.username.message}
        />
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
          label="Ім’я"
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
          label="Дата народження"
          register={register('birthday', {
            required: 'Обов`язкове поле!',
          })}
          name="birthday"
          error={errors.birthday && errors.birthday.message}
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
          })}
          name="phone"
          error={errors.phone && errors.phone.message}
        />
      </Fields>
      <Functions>
        <Button name="discardChanges" onClick={setDefaultValue}>
          Відмінити зміни
        </Button>
        <Button name="submitPersonalData" type="submit">
          Зберегти зміни
        </Button>
      </Functions>
    </Form>
  );
}

ChangeInfo.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    surname: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
    fatherName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};
