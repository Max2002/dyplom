import { parseCookies } from 'nookies';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import apiRequest from '@/api/api';
import User from '@/sections/User/index';
import { createStructuredSelector } from 'reselect';
import { activeOrgSelector } from '@/redux/selectors/getUser';
import {
  getEmployer,
  releaseEmployer,
} from '@/redux/actionCreator/getEmployer';
import {
  employerSelector,
  organisationsSelector,
} from '@/redux/selectors/getEmployer';
import isAuth from '@/utils/HOCAuth';
import getCurrentMonthAndYear from '@/utils/getCurrentMonthAndYear';
import convertXLS from '@/utils/convertXLS';
import getWorkInformation from '@/utils/getWorkInformation';

const dataSel = createStructuredSelector({
  activeOrg: activeOrgSelector,
  employer: employerSelector,
  organisations: organisationsSelector,
});

function Id({ user, serverOrganisations, id, schedules, vacations }) {
  const dispatch = useDispatch();
  const [isVacation, setIsVacation] = useState(false);
  const [paramsWork, setParamsWork] = useState({});
  const { activeOrg, employer, organisations } = useSelector(dataSel);
  const { currentMonth, currentYear } = getCurrentMonthAndYear();
  const PIB = `${user.surname} ${user.name[0]}.${user.fatherName[0]}.`;

  const dispatchPosition = () => {
    dispatch(getEmployer(id));
  };

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
  }, [PIB, currentMonth, currentYear, vacations]);

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

  return (
    <>
      <Head>
        <title>Сторінка користувача</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <User
        user={Object.keys(employer).length === 0 ? user : employer}
        activeOrgId={activeOrg?.id}
        organisations={
          organisations.length === 0 ? serverOrganisations : organisations
        }
        dispatchPosition={dispatchPosition}
        releaseEmployer={() => dispatch(releaseEmployer())}
        paramsWork={paramsWork}
      />
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  const { idOrganisation } = parseCookies({ req: context.req });

  const {
    data: { organisations: serverOrganisations },
  } = await apiRequest.get(`/api/get-organisations/${id}`);
  const { data: user } = await apiRequest.get(
    `/api/users/${id}?populate=avatar,payrolls.organisation,payrolls.users_permissions_users`,
  );
  const {
    data: { schedules },
  } = await apiRequest.get(`/api/get-workSchedules/${idOrganisation}`);
  const {
    data: { vacations },
  } = await apiRequest.get(`/api/get-vacationSchedules/${idOrganisation}`);

  return {
    props: { user, serverOrganisations, id, schedules, vacations },
  };
};

Id.propTypes = {
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
    avatar: PropTypes.object,
    salary: PropTypes.number,
  }).isRequired,
  serverOrganisations: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  schedules: PropTypes.arrayOf(PropTypes.object).isRequired,
  vacations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default isAuth(Id);
