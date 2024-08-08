import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import convertXLS from '@/utils/convertXLS';
import ScheduleAdmin from '@/sections/ScheduleAdmin';
import {
  Wrapper,
  Profit,
  ResultProfit,
  ChartStyle,
} from '@/sections/Accounting/styled';
import Chart from '@/components/Chart';

export default function Accounting({
  accounting: {
    accounting: {
      tax,
      file,
      month,
      year,
      organisation: { payrolls, work_schedules },
    },
  },
}) {
  const [profit, setProfit] = useState({
    dirtyProfit: 0,
    tax,
    salaries: 0,
    excludeCosts: 0,
  });
  const [costs, setCosts] = useState(0);
  const [salaries, setSalaries] = useState(0);
  const [chart, setChart] = useState([{ day: 0, profit: 0, costs: 0 }]);

  const getTime = (arr) => {
    return arr
      .slice(1)
      .filter((item) => item.length > 1)
      .map((hours) => {
        const [from, to] = hours.split(/[,\-|]/);

        if (+from && +to) {
          return +to - +from;
        }

        return 0;
      })
      .reduce((prev, current) => prev + current, 0);
  };

  useEffect(() => {
    const users = {};
    const findSchedule = work_schedules.find(
      ({ month: monthSchedule, year: yearSchedule }) =>
        monthSchedule === month && yearSchedule === year,
    );

    if (findSchedule) {
      const callback = (convertFile) => {
        const filterFile = convertFile.filter((el) => el.length > 0).slice(2);

        filterFile.forEach((el, index) => {
          if (index % 2 === 0) {
            const time = getTime(el) + getTime(filterFile[index + 1]);
            const position = payrolls.find(({ users_permissions_users }) =>
              users_permissions_users.find(
                ({ name, surname, fatherName }) =>
                  `${surname} ${name[0]}.${fatherName[0]}.` === el[0],
              ),
            );

            if (position) {
              users[el[0]] = time * position.salary;
            }
          }
        });

        setSalaries(
          Object.values(users).reduce((prev, current) => prev + current, 0),
        );
      };

      convertXLS(findSchedule?.file.url, callback);
    }
  }, [work_schedules]);

  useEffect(() => {
    if (file.url) {
      const callback = (convertFile) => {
        const excludeEmpty = convertFile.filter((el) => el.length > 0);
        const dataChart = [];

        excludeEmpty.slice(0, 2).forEach((item, indexRow) =>
          item.forEach((el, indexCell) => {
            if (+el) {
              dataChart.push({
                day: el,
                profit: excludeEmpty[indexRow === 0 ? 2 : 3][indexCell],
                costs: excludeEmpty[indexRow === 0 ? 6 : 7][indexCell],
              });
            }
          }),
        );

        setChart(dataChart);
        const excludeHeader = convertFile.filter(
          (el, index) => el.length > 0 && index > 1 && index < 4,
        );
        const costsSum = convertFile
          .filter((el, index) => el.length > 0 && index > 7)
          .flatMap((el) => el.filter((index) => index > 0))
          .reduce((prev, current) => prev + current, 0);

        const dirtyProfit = excludeHeader
          .flatMap((el) => el.filter((index) => index > 0))
          .reduce((prev, current) => prev + current, 0);
        const excludeTax = dirtyProfit - dirtyProfit * (tax / 100);
        const excludeSalaries = excludeTax - salaries;

        setProfit({
          dirtyProfit,
          tax,
          salaries,
          excludeCosts: excludeSalaries - costsSum,
        });
        setCosts(costsSum);
      };

      convertXLS(file.url, callback);
    }
  }, [file, salaries, tax]);

  return (
    <Wrapper>
      <ScheduleAdmin
        file={file}
        headers={2}
        rowSpan
        back={false}
        empty={[4, 5]}
      />
      <Profit>
        <div>Прибуток {profit.dirtyProfit}</div>
        <div>- {profit.tax}% податку</div>
        <div>- {salaries} грн зарплат</div>
        <div>- {costs} грн витрат</div>
      </Profit>
      <ResultProfit>
        {profit.excludeCosts > 0 || profit.excludeCosts === 0
          ? `Чистий дохід `
          : `Збиткі `}
        {profit.excludeCosts} грн
      </ResultProfit>
      <ChartStyle>
        <Chart data={chart} />
      </ChartStyle>
    </Wrapper>
  );
}

Accounting.propTypes = {
  accounting: PropTypes.shape({
    status: PropTypes.number.isRequired,
    accounting: PropTypes.shape({
      tax: PropTypes.number,
      year: PropTypes.number,
      month: PropTypes.string,
      file: PropTypes.shape({
        id: PropTypes.number,
        size: PropTypes.number,
        mime: PropTypes.string,
        name: PropTypes.string,
        url: PropTypes.string,
        hash: PropTypes.string,
      }),
      organisation: PropTypes.object,
    }).isRequired,
  }).isRequired,
};
