import { useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { IoMdImages } from 'react-icons/io';
import { RiImageAddFill } from 'react-icons/ri';
import { useRouter } from 'next/router';
import { createStructuredSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import apiRequest from '@/api/api';
import ChangeInfo from '@/sections/Cabinet/changeInfo';
import Button from '@/components/Button';
import Select from '@/components/Select';
import TextField from '@/components/TextField';
import Modal from '@/components/Modal';
import ActionAvatar from '@/sections/Cabinet/actionAvatar';
import {
  userSelector,
  tokenSelector,
  activeOrgSelector,
} from '@/redux/selectors/getUser';
import {
  getUser,
  setActiveOrganisation,
  changePass,
  logOut,
} from '@/redux/actionCreator/getUser';
import { ERROR } from '@/constants/messages';
import StatusRequest from '@/components/StatusRequest';
import {
  Avatar,
  Form,
  LabelAvatar,
  NodeAvatar,
  EmptyOrg,
  Title,
  Question,
  Answers,
  Invalid,
} from '@/sections/Cabinet/styled';

const userSel = createStructuredSelector({
  user: userSelector,
  token: tokenSelector,
  activeOrg: activeOrgSelector,
});

export default function Info({ organisations }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, token, activeOrg } = useSelector(userSel);
  const [message, setMessage] = useState(null);
  const [isChangePass, setIsChangePass] = useState(false);
  const [deleteProfile, setDeleteProfile] = useState(false);
  const [actionAvatar, setActionAvatar] = useState(false);
  const [invalid, setInvalid] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      currentPassword: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  const submitChangePass = async ({
    currentPassword,
    password,
    passwordConfirmation,
  }) => {
    try {
      if (password === passwordConfirmation && token) {
        const {
          data: { jwt },
        } = await apiRequest.post(
          `/api/auth/change-password`,
          { currentPassword, password, passwordConfirmation },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (jwt) {
          dispatch(changePass(jwt));
          setIsChangePass(false);
          reset();
          localStorage.setItem('token', jwt);
          dispatch(getUser(jwt));
          setMessage('Пароль успішно змінено)');
        } else {
          setInvalid('Невірний пароль!');
        }
      } else {
        setInvalid('Паролі не співпадають!');
      }
    } catch (e) {
      setMessage(ERROR);
    }
  };

  const changeActiveOrg = (idOrg, nameOrg, logo) => {
    dispatch(setActiveOrganisation(idOrg, nameOrg, logo));
  };

  const onDeleteProfile = async () => {
    try {
      await apiRequest.delete(`/api/users/${user?.id}`);

      dispatch(logOut());
      setDeleteProfile(false);
      router.push('/');
      setMessage('Обліковий запис успішно видалено)');
    } catch (e) {
      setMessage(ERROR);
    }
  };

  const getDeleteModal = () => {
    return (
      <Modal onClose={() => setDeleteProfile(false)} position="center">
        <Question>Ви впевнені, що хочете видалити обліковий запис?</Question>
        <Answers>
          <Button name="deleteProfile" onClick={onDeleteProfile}>
            Так
          </Button>
          <Button
            name="noDeleteProfile"
            onClick={() => setDeleteProfile(false)}
          >
            Ні
          </Button>
        </Answers>
      </Modal>
    );
  };

  return (
    <>
      <Title>Особисті дані</Title>
      <LabelAvatar>Аватар</LabelAvatar>
      <NodeAvatar>
        <Avatar
          onClick={() => setActionAvatar(true)}
          isAvatar={user?.avatar?.url}
          src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${user?.avatar?.url}`}
        >
          <div>
            {user?.avatar?.url ? (
              <IoMdImages size={40} />
            ) : (
              <RiImageAddFill size={35} />
            )}
          </div>
        </Avatar>
        <div>
          <Button name="changePassword" onClick={() => setIsChangePass(true)}>
            Змінити пароль
          </Button>
          <Button name="deleteCabinet" onClick={() => setDeleteProfile(true)}>
            Видалити профіль
          </Button>
          {organisations.length === 0 ? (
            <EmptyOrg>
              Поки що у вас не має організацій в яких ви{' '}
              {user?.owner ? 'є власником' : 'зареєстровані'}
            </EmptyOrg>
          ) : (
            <Select
              onChange={changeActiveOrg}
              options={organisations}
              defaultValue={activeOrg.name || organisations[0]?.name}
            />
          )}
        </div>
      </NodeAvatar>
      {deleteProfile && getDeleteModal()}
      {actionAvatar && (
        <ActionAvatar
          id={user?.id}
          avatarId={user?.avatar?.id}
          setActionAvatar={setActionAvatar}
          isAvatar={!!user?.avatar?.url}
          dispatch={dispatch}
          setMessage={setMessage}
          token={token}
        />
      )}
      <ChangeInfo
        user={user}
        dispatch={dispatch}
        setMessage={setMessage}
        token={token}
      />
      {isChangePass && (
        <Modal
          onClose={() => {
            setIsChangePass(false);
            reset();
          }}
          position="center"
        >
          <Form size={400} onSubmit={handleSubmit(submitChangePass)}>
            <TextField
              type="password"
              label="Поточний пароль"
              register={register('currentPassword', {
                required: 'Обов`язкове поле!',
              })}
              name="currentPassword"
              error={errors.currentPassword && errors.currentPassword.message}
            />
            <TextField
              type="password"
              label="Новий пароль"
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
              label="Підтвердіть пароль"
              register={register('passwordConfirmation', {
                required: 'Обов`язкове поле!',
              })}
              name="passwordConfirmation"
              error={
                errors.passwordConfirmation &&
                errors.passwordConfirmation.message
              }
            />
            <Button name="submitChangePass" type="submit">
              Змінити пароль
            </Button>
          </Form>
          {invalid && <Invalid>{invalid}</Invalid>}
        </Modal>
      )}
      {message && (
        <StatusRequest close={() => setMessage(null)} message={message} />
      )}
    </>
  );
}

Info.propTypes = {
  organisations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
