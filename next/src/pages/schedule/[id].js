import PropTypes from 'prop-types';
import apiRequest from '@/api/api';
import ScheduleAdmin from '@/sections/ScheduleAdmin';
import isAuth from '@/utils/HOCAuth';

function Id({ schedule }) {
  return <ScheduleAdmin schedule={schedule} />;
}

export const getServerSideProps = async (context) => {
  try {
    const { id } = context.params;

    const { data: schedule } = await apiRequest.get(`/api/upload/files/${id}`);

    return {
      props: { schedule },
    };
  } catch (e) {
    return {
      props: { schedule: {} },
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
};

export default isAuth(Id);
