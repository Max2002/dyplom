import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { userSelector } from '@/redux/selectors/getUser';
import getCurrentMonthAndYear from '@/utils/getCurrentMonthAndYear';
import Notification from '@/components/Notification';
import getWorkInformation from '@/utils/getWorkInformation';
import convertXLS from '@/utils/convertXLS';
import { Header, Position, NodeInfo } from '@/sections/Cabinet/styled';

const userSel = createStructuredSelector({
  user: userSelector,
});

export default function PositionInfo({ activeOrg, schedules, vacations, PIB }) {
  const {
    user: { payrolls },
  } = useSelector(userSel);
  const [position, setPosition] = useState({});
  const [isVacation, setIsVacation] = useState(false);
  const [paramsWork, setParamsWork] = useState({});
  const { currentMonth, currentYear } = getCurrentMonthAndYear();

  useEffect(() => {
    const findVacation = vacations.find(
      ({ month, year }) => month === currentMonth && year === currentYear,
    );

    if (findVacation) {
      const callback = (convertFile) => {
        const convertToLineArr = [].concat(...convertFile.slice(1));

        setIsVacation(convertToLineArr.find((el) => el === PIB));
      };

      convertXLS(findVacation?.file.url, callback);
    }
  }, [PIB, schedules, vacations]);

  useEffect(() => {
    const findSchedule = schedules.find(
      ({ month, year }) => month === currentMonth && year === currentYear,
    );

    if (isVacation) {
      setParamsWork({ days: 0, hours: 0 });
    } else if (findSchedule) {
      const callback = (convertFile) => {
        setParamsWork(getWorkInformation(PIB, convertFile));
      };

      convertXLS(findSchedule?.file.url, callback);
    } else {
      setParamsWork({});
    }
  }, [PIB, currentMonth, currentYear, isVacation, schedules]);

  useEffect(() => {
    if (payrolls?.length > 0) {
      const { salary, position: positionActive } = payrolls.find(
        ({ organisation }) => organisation.id === activeOrg.id,
      );

      setPosition({ position: positionActive, salary });
    }
  }, [activeOrg, payrolls]);

  const getSalary = () => {
    return schedules.length === 0 ? (
      <Notification fontSize={18}>
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

  return payrolls?.length === 0 ? (
    <Notification textAlign="center" fontSize={18}>
      Ви поки що не працюєте в жодній з організацій. Надалі тут буде відображена
      робоча інформація
    </Notification>
  ) : (
    <div>
      <Header>
        Організація <span>{activeOrg.name}</span>
      </Header>
      <Position>
        <NodeInfo>
          Посада: <span>{position.position}</span>
        </NodeInfo>
        <NodeInfo>
          Заробітна плата: <span>{position.salary} грн/год</span>
        </NodeInfo>
        {paramsWork.days === 0 && paramsWork.hours === 0 ? (
          <Notification fontSize={18}>
            На даний момент Ви перебуваєте у відпустці
          </Notification>
        ) : (
          getSalary()
        )}
      </Position>
    </div>
  );
}

PositionInfo.propTypes = {
  activeOrg: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  schedules: PropTypes.arrayOf(PropTypes.object).isRequired,
  vacations: PropTypes.arrayOf(PropTypes.object).isRequired,
  PIB: PropTypes.string.isRequired,
};
