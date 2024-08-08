import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import apiRequest from '@/api/api';
import Notification from '@/components/Notification';
import Modal from '@/components/Modal';
import TextField from '@/components/TextField';
import Select from '@/components/Select';
import { ERROR } from '@/constants/messages';
import StatusRequest from '@/components/StatusRequest';
import Button from '@/components/Button';
import {
  Wrapper,
  Image,
  Name,
  Info,
  Description,
  Position,
  SendOffer,
  FormOffer,
} from '@/sections/Organisation/styled';

export default function Organisation({
  organisation: { id, name, description, logo, payrolls },
  userId,
  fullName,
}) {
  const [isOpenPositions, setIsOpenPositions] = useState([]);
  const [positions, setPositions] = useState([]);
  const [choosePosition, setChoosePosition] = useState('');
  const [sendOffer, setSendOffer] = useState(false);
  const [isWork, setIsWork] = useState(false);
  const [message, setMessage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      nameSurname: '',
      selfDescribe: '',
      organisation: 0,
      user_id: 0,
    },
  });

  useEffect(() => {
    setValue('nameSurname', fullName);
    setValue('organisation', id);
    setValue('user_id', userId);
  }, [fullName, id, userId]);

  useEffect(() => {
    if (payrolls.length !== 0) {
      const workOrg = payrolls.find(({ users_permissions_users }) =>
        users_permissions_users.map((user) => user.id).includes(userId),
      );

      setIsWork(!!workOrg);
      setIsOpenPositions(payrolls.filter(({ isOpen }) => isOpen));
      setPositions(
        payrolls
          .map(
            ({ id: payrollId, isOpen, position }) =>
              isOpen && { id: payrollId, name: position },
          )
          .filter((position) => position),
      );
    }
  }, [payrolls]);

  const onSubmit = async (submitData) => {
    try {
      await apiRequest.post(`/api/job-applications`, {
        data: {
          ...submitData,
          position: choosePosition || positions[0].name,
          status: 'pending',
        },
      });

      setMessage(
        'Заявка усіпшно надіслана, слідкуйте за її статусом в особистому кабінеті',
      );
    } catch (e) {
      setMessage(ERROR);
    }

    setSendOffer(false);
  };

  const getModalSend = () => {
    return (
      <Modal onClose={() => setSendOffer(false)}>
        <FormOffer onSubmit={handleSubmit(onSubmit)}>
          <Select
            onChange={(idPos, namePos) => setChoosePosition(namePos)}
            defaultValue={positions[0].name}
            options={positions}
            back="rgba(0, 0, 0, 0.4)"
            color="#fff"
          />
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
          <Button name="sendApplication" type="submit">
            Надіслати
          </Button>
        </FormOffer>
      </Modal>
    );
  };

  return (
    <Wrapper>
      <Image url={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${logo[0].url}`} />
      <Info>
        <Name>{name}</Name>
        <Description>{description}</Description>
        <div>
          {isOpenPositions.length === 0 ? (
            <Notification fontSize={18}>
              В даній організаціх не має вільних вакансій для подачі заявки на
              роботу
            </Notification>
          ) : (
            <>
              <Notification fontSize={18}>
                Дана організація має вільні вакансії, вони наведені нижче
              </Notification>
              {isOpenPositions.map(({ position, salary }) => (
                <Position>
                  <span>{position}:</span>
                  <span>заробітна плата {salary} грн/год</span>
                </Position>
              ))}
              {isWork ? (
                <Notification>Ви вже працюєте в даній організації</Notification>
              ) : (
                <SendOffer name="sendOffer" onClick={() => setSendOffer(true)}>
                  Подати заявку на роботу
                </SendOffer>
              )}
            </>
          )}
        </div>
      </Info>
      {sendOffer && getModalSend()}
      {message && (
        <StatusRequest message={message} close={() => setMessage(null)} />
      )}
    </Wrapper>
  );
}

Organisation.propTypes = {
  organisation: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    logo: PropTypes.object,
    organisation: PropTypes.object,
    payrolls: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        position: PropTypes.string,
        salary: PropTypes.number,
        isOpen: PropTypes.bool,
        organisation: PropTypes.object,
      }),
    ),
  }).isRequired,
  userId: PropTypes.number.isRequired,
  fullName: PropTypes.string.isRequired,
};
