import PropTypes from 'prop-types';
import Schedule from '@/components/Schedule';
import { useEffect, useState } from 'react';
import Select from '@/components/Select';
import getCurrentMonthAndYear from '@/utils/getCurrentMonthAndYear';
import MONTHS from '@/constants/months';
import Notification from '@/components/Notification';
import {
  Wrapper,
  Header,
  Table,
  Title,
  DownloadFile,
  Filter,
} from '@/sections/ScheduleUser/styled';

export default function ScheduleUser({
  schedules,
  status,
  activeOrg,
  headers,
  rowSpan,
}) {
  const [monthFilter, setMonthFilter] = useState('');
  const [yearFilter, setYearFilter] = useState(null);
  const [filterSchedule, setFilterSchedule] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    const { currentMonth, currentYear } = getCurrentMonthAndYear();

    setYears(schedules.map(({ year }, index) => ({ id: index, name: year })));
    setMonthFilter(currentMonth);
    setYearFilter(currentYear);
  }, [schedules]);

  useEffect(() => {
    setFilterSchedule(
      schedules.filter(
        ({ month, year }) => month === monthFilter && year === yearFilter,
      ),
    );
  }, [monthFilter, yearFilter, schedules]);

  const getSchedules = () => {
    return filterSchedule.length === 0 ? (
      <Notification fontSize={24} textAlign="center">
        На місяць {monthFilter} та рік {yearFilter} графіків не має
      </Notification>
    ) : (
      filterSchedule.map(({ month, year, file }) => (
        <Table>
          <Title>
            Графік за місяць {month} {year} року
          </Title>
          <Schedule url={file.url} headers={headers} rowSpan={rowSpan} />
          <DownloadFile
            href={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${file.url}`}
          >
            Завантажити графік
          </DownloadFile>
        </Table>
      ))
    );
  };

  return (
    <Wrapper>
      {schedules.length === 0 ? (
        <Notification fontSize={24} textAlign="center">
          {status === 200
            ? 'На даний момент графіків не має'
            : 'На сервері щось пішло не так! Вибачте за незручності та повідомте нам про помилку.'}
        </Notification>
      ) : (
        <>
          <Header>
            Графіки організації <span>{activeOrg.name}</span>
          </Header>
          <Filter>
            <Select
              onChange={(id, name) => setMonthFilter(name)}
              defaultValue={monthFilter}
              options={MONTHS}
              back="rgba(0, 0, 0, 0.4)"
              color="#fff"
            />
            <Select
              onChange={(id, name) => setYearFilter(name)}
              defaultValue={yearFilter}
              options={years}
              back="rgba(0, 0, 0, 0.4)"
              color="#fff"
            />
          </Filter>
          {getSchedules()}
        </>
      )}
    </Wrapper>
  );
}

ScheduleUser.propTypes = {
  schedules: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.number.isRequired,
  activeOrg: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  headers: PropTypes.number.isRequired,
  rowSpan: PropTypes.bool.isRequired,
};
