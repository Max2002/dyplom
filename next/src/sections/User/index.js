import PropTypes from 'prop-types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import apiRequest from '@/api/api';
import { ERROR } from '@/constants/messages';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import Select from '@/components/Select';
import StatusRequest from '@/components/StatusRequest';
import Notification from '@/components/Notification';
import { RxAvatar } from 'react-icons/rx';
import {
  UserStyle,
  Avatar,
  Photo,
  UserName,
  MainInfo,
  NodeInfo,
  SalaryInfo,
  TitleSalary,
  ChoosePosition,
  AnswersButton,
} from '@/sections/User/styled';

export default function User({
  user,
  activeOrgId,
  organisations,
  dispatchPosition,
  releaseEmployer,
  paramsWork,
}) {
  const {
    surname,
    name,
    fatherName,
    birthday,
    phone,
    username,
    email,
    avatar,
    payrolls,
  } = user;
  const [position, setPosition] = useState({});
  const [isChangePosition, setIsChangePosition] = useState(false);
  const [isRelease, setIsRelease] = useState(false);
  const [positions, setPositions] = useState([]);
  const [choosePosition, setChoosePosition] = useState({});
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (activeOrgId) {
      const {
        id,
        salary,
        position: positionActive,
        users_permissions_users,
      } = payrolls.find(({ organisation }) => organisation.id === activeOrgId);

      setPosition({
        id,
        position: positionActive,
        salary,
        users_permissions_users,
      });
    }
  }, [payrolls, activeOrgId]);

  useEffect(() => {
    const organisationPayrolls = organisations.find(
      ({ id }) => id === activeOrgId,
    )?.payrolls;

    if (position.position) {
      const filterPayrolls = organisationPayrolls.filter(
        ({ position: payrollPosition }) =>
          payrollPosition !== position.position &&
          payrollPosition !== 'Власник',
      );

      setPositions(filterPayrolls);

      if (filterPayrolls.length > 0) {
        setChoosePosition({
          id: filterPayrolls[0].id,
          position: filterPayrolls[0].position,
        });
      }
    }
  }, [activeOrgId, organisations, position]);

  const onChoosePosition = async () => {
    try {
      const usersId = position.users_permissions_users.filter(
        ({ id }) => id !== user.id,
      );
      const usersIdNewPosition = organisations
        .find(({ id }) => id === activeOrgId)
        .payrolls.find(({ id }) => id === choosePosition.id)
        .users_permissions_users.map(({ id }) => id);

      usersIdNewPosition.push(user.id);

      await apiRequest.put(`/api/payrolls/${position.id}`, {
        data: { users_permissions_users: usersId },
      });
      await apiRequest.put(`/api/payrolls/${choosePosition.id}`, {
        data: { users_permissions_users: usersIdNewPosition },
      });
      setIsChangePosition(false);
      dispatchPosition();
      setMessage('Посаду робітника успішно змінено)');
    } catch (e) {
      setMessage(ERROR);
    }
  };

  const onRelease = async () => {
    try {
      const usersId = position.users_permissions_users.filter(
        ({ id }) => id !== user.id,
      );

      await apiRequest.put(`/api/payrolls/${position.id}`, {
        data: { users_permissions_users: usersId },
      });
      setIsRelease(false);
      releaseEmployer();
      setMessage('Робітника успішно звільнено');
    } catch (e) {
      setMessage(ERROR);
    }
  };

  const getChangePosition = () => {
    return (
      <Modal onClose={() => setIsChangePosition(false)} position="center">
        <ChoosePosition>
          {positions.length === 0 ? (
            <div>В вашій організації не має доступних робочих місць</div>
          ) : (
            <>
              <Notification fontSize={20}>
                Оберіть посаду зі списку
              </Notification>
              <Select
                onChange={(id, namePos) =>
                  setChoosePosition({ id, position: namePos })
                }
                defaultValue={positions[0].position}
                options={positions}
                back="#bf8c6f"
                maxWidth
                color="#fff"
              />
              <Button
                name="onChoosePosition"
                onClick={() => onChoosePosition()}
              >
                Змінити
              </Button>
            </>
          )}
        </ChoosePosition>
      </Modal>
    );
  };

  const getRelease = () => {
    return (
      <Modal onClose={() => setIsRelease(false)} position="center">
        <Notification fontSize={20}>
          Ви дійсно хочете звільнити даного робітника
        </Notification>
        <AnswersButton>
          <Link href="/cabinet" onClick={() => onRelease()}>
            Так
          </Link>
          <Button name="notRelease" onClick={() => setIsRelease(false)}>
            Ні
          </Button>
        </AnswersButton>
      </Modal>
    );
  };

  const getSalary = () => {
    return Object.keys(paramsWork).length === 0 ? (
      <Notification fontSize={20}>
        На поточний місяць ще не має графіку за яким можливо підрахувати
        заробітну плату
      </Notification>
    ) : (
      <>
        <NodeInfo>
          Робочих днів в поточному місяці: <span>{paramsWork.days}</span>
        </NodeInfo>
        <NodeInfo>
          Остаточна заробітна плата за місяць:
          <span>{position.salary * paramsWork.hours} грн</span>
        </NodeInfo>
      </>
    );
  };

  return (
    <UserStyle>
      <Avatar>
        <UserName>{username}</UserName>
        {avatar?.url ? (
          <Photo
            url={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${avatar?.url}`}
          />
        ) : (
          <RxAvatar size={100} color="#fff" />
        )}
      </Avatar>
      <MainInfo>
        <NodeInfo>
          Повне ім&apos;я:
          <span>
            {surname} {name} {fatherName}
          </span>
        </NodeInfo>
        <NodeInfo>
          Електрона адреса: <span>{email}</span>
        </NodeInfo>
        <NodeInfo>
          День народження: <span>{birthday}</span>
        </NodeInfo>
        <NodeInfo>
          Номер телефону: <span>{phone}</span>
        </NodeInfo>
        <SalaryInfo>
          <TitleSalary>Дохід робітника</TitleSalary>
          <NodeInfo>
            Посада:
            <span>{position.position}</span>
            <Button
              name="choosePosition"
              onClick={() => setIsChangePosition(true)}
            >
              Змінити посаду
            </Button>
          </NodeInfo>
          <NodeInfo>
            Заробітна плата: <span>{position.salary} грн/год</span>
          </NodeInfo>
          {paramsWork.days === 0 && paramsWork.hours === 0 ? (
            <Notification fontSize={20}>
              Даний працівник знаходиться у відпустці
            </Notification>
          ) : (
            getSalary()
          )}
          <Button name="release" onClick={() => setIsRelease(true)}>
            Звільнити працівника
          </Button>
        </SalaryInfo>
      </MainInfo>
      {isChangePosition && getChangePosition()}
      {isRelease && getRelease()}
      {message && (
        <StatusRequest close={() => setMessage(null)} message={message} />
      )}
    </UserStyle>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    birthday: PropTypes.string,
    blocked: PropTypes.bool,
    confirmed: PropTypes.bool,
    createdAt: PropTypes.string,
    email: PropTypes.string,
    fatherName: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string,
    owner: PropTypes.bool,
    phone: PropTypes.string,
    provider: PropTypes.string,
    surname: PropTypes.string,
    updatedAt: PropTypes.string,
    username: PropTypes.string,
    organisations: PropTypes.arrayOf(PropTypes.object),
    avatar: PropTypes.object,
    payrolls: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  activeOrgId: PropTypes.number.isRequired,
  organisations: PropTypes.object.isRequired,
  dispatchPosition: PropTypes.func.isRequired,
  releaseEmployer: PropTypes.func.isRequired,
  paramsWork: PropTypes.shape({
    days: PropTypes.number,
    hours: PropTypes.number,
  }).isRequired,
};
