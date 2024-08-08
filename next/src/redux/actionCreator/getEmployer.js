import apiRequest from '@/api/api';

export const GET_EMPLOYER_FETCHING = 'GET_EMPLOYER/FETCHING';
export const GET_EMPLOYER_SUCCESS = 'GET_EMPLOYER/SUCCESS';
export const GET_EMPLOYER_ERROR = 'GET_EMPLOYER/ERROR';
export const RELEASE_EMPLOYER = 'RELEASE_EMPLOYER';

const employerFetching = () => ({
  type: GET_EMPLOYER_FETCHING,
});

const employerSuccess = (employer, organisations) => ({
  type: GET_EMPLOYER_SUCCESS,
  payload: { employer, organisations },
});

const employerError = (error) => ({
  type: GET_EMPLOYER_ERROR,
  payload: error,
});

export const releaseEmployer = () => ({
  type: RELEASE_EMPLOYER,
});

export const getEmployer = (userId) => async (dispatch) => {
  dispatch(employerFetching());
  try {
    const { data: employer } = await apiRequest.get(
      `/api/users/${userId}?populate=avatar,payrolls.organisation,payrolls.users_permissions_users`,
    );
    const {
      data: { organisations },
    } = await apiRequest.get(`/api/get-organisations/${userId}`);

    dispatch(employerSuccess(employer, organisations));
  } catch (error) {
    dispatch(employerError(error));
  }
};
