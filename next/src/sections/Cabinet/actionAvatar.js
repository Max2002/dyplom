import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { RiImageAddFill } from 'react-icons/ri';
import apiRequest from '@/api/api';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import { getUser } from '@/redux/actionCreator/getUser';
import { ERROR } from '@/constants/messages';
import Notification from '@/components/Notification';
import {
  Form,
  DropAvatar,
  FileName,
  ActionButtons,
} from '@/sections/Cabinet/styled';

export default function ActionAvatar({
  id,
  avatarId,
  setActionAvatar,
  isAvatar,
  dispatch,
  setMessage,
  token,
}) {
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      avatar: '',
    },
  });
  const fileName = watch('avatar', '')[0]?.name;

  const onSubmit = async ({ avatar }) => {
    try {
      const formData = new FormData();

      if (isAvatar) {
        await apiRequest.delete(`/api/upload/files/${avatarId}`);
      }

      formData.append('files', avatar[0]);
      const uploadedFile = await apiRequest.post(`/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      await apiRequest.put(`/api/users/${id}`, {
        avatar: uploadedFile.data[0].id,
      });

      setActionAvatar(false);
      dispatch(getUser(token));
      setMessage('Аватар успішно змінено/додано)');
    } catch (e) {
      setMessage(ERROR);
    }
  };

  const onDeleteAvatar = async () => {
    try {
      await apiRequest.delete(`/api/upload/files/${avatarId}`);

      setActionAvatar(false);
      dispatch(getUser(token));
      setMessage('Аватар успішно видалено)');
    } catch (e) {
      setMessage(ERROR);
    }
  };

  return (
    <Modal
      onClose={() => {
        setActionAvatar(false);
        reset();
      }}
      position="center"
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <DropAvatar>
          <RiImageAddFill size={30} color="#40282C" />
          <Notification fontSize={18}>
            Перетяніть сюди фото або оберіть його з носія
          </Notification>
          <FileName>{fileName || 'Файл не обрано'}</FileName>
          <Button name="openFileManager">Обрати файл</Button>
          <input
            type="file"
            {...register('avatar', { required: 'Обов`язкове поле!' })}
            accept="image/png, image/jpg, image/jpeg"
            tabIndex={-1}
          />
        </DropAvatar>
        <ActionButtons>
          <Button name="updateAvatar" type="submit">
            Завантажити аватар
          </Button>
          {isAvatar && (
            <Button name="deleteAvatar" onClick={() => onDeleteAvatar()}>
              Видалити аватар
            </Button>
          )}
        </ActionButtons>
      </Form>
    </Modal>
  );
}

ActionAvatar.propTypes = {
  id: PropTypes.number.isRequired,
  avatarId: PropTypes.number.isRequired,
  setActionAvatar: PropTypes.func.isRequired,
  isAvatar: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};
