import PropTypes from 'prop-types';
import Head from 'next/head';
import apiRequest from '@/api/api';
import ScheduleAdmin from '@/sections/ScheduleAdmin';
import isAuth from '@/utils/HOCAuth';

function Id({ schedule, nameSchedule }) {
  return (
    <>
      <Head>
        <title>Графік для адміністратора</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <ScheduleAdmin
        file={schedule}
        headers={nameSchedule === 'work' ? 2 : 1}
        rowSpan={nameSchedule === 'work'}
      />
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { id, nameSchedule } = context.params;

  try {
    const { data: schedule } = await apiRequest.get(`/api/upload/files/${id}`);

    return {
      props: { schedule, nameSchedule },
    };
  } catch (e) {
    return {
      props: { schedule: {}, nameSchedule },
    };
  }
};

Id.propTypes = {
  schedule: PropTypes.shape({
    id: PropTypes.number,
    size: PropTypes.number,
    mime: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string,
    hash: PropTypes.string,
  }).isRequired,
  nameSchedule: PropTypes.string.isRequired,
};

export default isAuth(Id);
