import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { TiPencil } from 'react-icons/ti';
import { RiDeleteBin5Line } from 'react-icons/ri';
import StatusRequest from '@/components/StatusRequest';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import apiRequest from '@/api/api';
import { ERROR } from '@/constants/messages';
import TextField from '@/components/TextField';
import { getCollection } from '@/redux/actionCreator/getCollection';
import { getUsers } from '@/redux/actionCreator/getUsers';
import {
  Wrapper,
  Row,
  Cell,
  Answers,
  Question,
} from '@/sections/Cabinet/JobApplications/styled';
import Notification from '@/components/Notification';

export default function JobApplications({
  owner,
  applications: { applications },
  dispatch,
  endPoint,
}) {
  const [idChange, setIdChange] = useState(null);
  const [idDelete, setIdDelete] = useState(null);
  const [idApp, setIdApp] = useState(null);
  const [message, setMessage] = useState(null);
  const [onStatusApp, setOnStatusApp] = useState('');
  const getStatus = {
    pending: 'Заява в обробці організацією',
    fulfilled: 'Заяву підтверджено',
    rejected: 'Заяву відхилено',
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      nameSurname: '',
      selfDescribe: '',
    },
  });

  const defaultField = (name, describe) => {
    setValue('nameSurname', name);
    setValue('selfDescribe', describe);
  };

  const onChange = async (dataUpdate) => {
    try {
      await apiRequest.put(`/api/job-applications/${idChange}`, {
        data: dataUpdate,
      });

      setMessage('Дані заяви були успішно змінено');
      dispatch(getCollection(endPoint));
    } catch (e) {
      setMessage(ERROR);
    }

    setIdChange(null);
  };

  const onDelete = async () => {
    try {
      await apiRequest.delete(`/api/job-applications/${idDelete}`);

      setMessage('Заява на працевлаштування успішно видалена');
      dispatch(getCollection(endPoint));
    } catch (e) {
      setMessage(ERROR);
    }

    setIdDelete(null);
  };

  const confirmOrDeniedApp = async () => {
    try {
      await apiRequest.put(`/api/job-applications/${idApp}`, {
        data: { status: onStatusApp },
      });

      if (onStatusApp === 'fulfilled') {
        const application = applications.find((app) => app.id === idApp);
        const payroll = application.organisation.payrolls.find(
          ({ position }) => position === application.position,
        );
        const usersId = payroll.users_permissions_users.map((item) => item.id);

        usersId.push(application.user_id.id);

        await apiRequest.put(`/api/payrolls/${payroll.id}`, {
          data: { users_permissions_users: usersId },
        });
      }

      setMessage(
        `Запит на працевлаштування ${
          onStatusApp === 'rejected' ? 'відхилено' : 'погоджено'
        }`,
      );
      dispatch(getCollection(endPoint));
      dispatch(getUsers());
    } catch (e) {
      setMessage(ERROR);
    }
    setOnStatusApp('');
  };

  const getChange = () => {
    return (
      <Modal onClose={() => setIdChange(null)}>
        <form onSubmit={handleSubmit(onChange)}>
          <TextField
            type="text"
            label="Прізвище та ім'я"
            register={register('nameSurname', {
              required: 'Обов`язкове поле!',
            })}
            name="nameSurname"
            error={errors.nameSurname && errors.nameSurname.message}
          />
          <TextField
            type="text"
            label="Особиста інформація яка може бути корисна"
            register={register('selfDescribe', {
              required: 'Обов`язкове поле!',
            })}
            name="selfDescribe"
            error={errors.selfDescribe && errors.selfDescribe.message}
          />
          <Button name="changeApplication" type="submit">
            Змінити
          </Button>
        </form>
      </Modal>
    );
  };

  const getDelete = () => {
    return (
      <Modal onClose={() => setIdDelete(null)} position="center">
        <Question>
          Ви впевнені, що хочете видалити запит на працевлаштування?
        </Question>
        <Answers>
          <Button name="deleteApplication" onClick={onDelete}>
            Так
          </Button>
          <Button name="noDeleteApplication" onClick={() => setIdDelete(null)}>
            Ні
          </Button>
        </Answers>
      </Modal>
    );
  };

  const setStatusApp = () => {
    return (
      <Modal onClose={() => setOnStatusApp('')} position="center">
        <Question>
          Ви впевнені, що хочете{' '}
          {onStatusApp === 'fulfilled' ? 'погодити' : 'відхилити'} запит на
          працевлаштування?
        </Question>
        <Answers>
          <Button name="confirmApplication" onClick={confirmOrDeniedApp}>
            Так
          </Button>
          <Button name="deniedApplication" onClick={() => setOnStatusApp('')}>
            Ні
          </Button>
        </Answers>
      </Modal>
    );
  };

  return (
    <Wrapper>
      {!applications || applications.length === 0 ? (
        <Notification>
          У вас не має жодної заяви на працевлаштування
        </Notification>
      ) : (
        <table>
          <Row first>
            <Cell>Прізвище та ім&apos;я</Cell>
            <Cell>Особиста інформація</Cell>
            <Cell>Організація</Cell>
            <Cell>Статус</Cell>
          </Row>
          {applications.map(
            ({
              id,
              nameSurname,
              selfDescribe,
              status,
              organisation: { name },
            }) => (
              <Row key={id}>
                <Cell>{nameSurname}</Cell>
                <Cell>{selfDescribe}</Cell>
                <Cell>{name}</Cell>
                <Cell>{getStatus[status]}</Cell>
                <Cell>
                  {owner && status === 'pending' && (
                    <>
                      <Button
                        name="confirm"
                        onClick={() => {
                          setOnStatusApp('fulfilled');
                          setIdApp(id);
                        }}
                      >
                        Погодити
                      </Button>
                      <Button
                        name="denied"
                        onClick={() => {
                          setOnStatusApp('rejected');
                          setIdApp(id);
                        }}
                      >
                        Відмовити
                      </Button>
                    </>
                  )}
                </Cell>
                <Cell functions>
                  {!owner && status === 'pending' && (
                    <TiPencil
                      size={20}
                      onClick={() => {
                        setIdChange(id);
                        defaultField(nameSurname, selfDescribe);
                      }}
                    />
                  )}
                  <RiDeleteBin5Line size={20} onClick={() => setIdDelete(id)} />
                </Cell>
              </Row>
            ),
          )}
        </table>
      )}
      {idChange && getChange()}
      {idDelete && getDelete()}
      {onStatusApp && setStatusApp()}
      {message && (
        <StatusRequest message={message} close={() => setMessage(null)} />
      )}
    </Wrapper>
  );
}

JobApplications.propTypes = {
  owner: PropTypes.bool.isRequired,
  applications: PropTypes.shape({
    status: PropTypes.number,
    applications: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  endPoint: PropTypes.string.isRequired,
};
