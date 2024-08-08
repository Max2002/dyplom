import { parseCookies } from 'nookies';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';
import isAuth from '@/utils/HOCAuth';
import apiRequest from '@/api/api';
import ScheduleUser from '@/sections/ScheduleUser';
import { activeOrgSelector } from '@/redux/selectors/getUser';

const activeOrgSel = createStructuredSelector({
  activeOrg: activeOrgSelector,
});

function WorkSchedule({ schedules: { schedules, status } }) {
  const { activeOrg } = useSelector(activeOrgSel);

  return (
    <>
      <Head>
        <title>Робочі графіки</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <ScheduleUser
        schedules={schedules}
        status={status}
        activeOrg={activeOrg}
        headers={2}
        rowSpan
      />
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { req } = context;
  const { idOrganisation } = parseCookies({ req });

  const { data: schedules } = await apiRequest.get(
    `/api/get-workSchedules/${idOrganisation || 0}`,
  );

  return {
    props: {
      schedules,
    },
  };
};

WorkSchedule.propTypes = {
  schedules: PropTypes.shape({
    status: PropTypes.number.isRequired,
    schedules: PropTypes.object.isRequired,
    schema: PropTypes.object.isRequired,
  }).isRequired,
};

export default isAuth(WorkSchedule);
