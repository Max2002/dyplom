import isAuth from '@/utils/HOCAuth';
import { parseCookies } from 'nookies';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import PropTypes from 'prop-types';
import apiRequest from '@/api/api';
import { createStructuredSelector } from 'reselect';
import { activeOrgSelector } from '@/redux/selectors/getUser';
import ScheduleUser from '@/sections/ScheduleUser';

const activeOrgSel = createStructuredSelector({
  activeOrg: activeOrgSelector,
});

function VacationSchedule({ vacations: { vacations, status } }) {
  const { activeOrg } = useSelector(activeOrgSel);

  return (
    <>
      <Head>
        <title>Графіки відпусток</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <ScheduleUser
        schedules={vacations}
        status={status}
        activeOrg={activeOrg}
        headers={1}
        rowSpan={false}
      />
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { req } = context;
  const { idOrganisation } = parseCookies({ req });

  const { data: vacations } = await apiRequest.get(
    `/api/get-vacationSchedules/${idOrganisation || 0}`,
  );

  return {
    props: {
      vacations,
    },
  };
};

VacationSchedule.propTypes = {
  vacations: PropTypes.shape({
    status: PropTypes.number.isRequired,
    vacations: PropTypes.object.isRequired,
  }).isRequired,
};

export default isAuth(VacationSchedule);
