import apiRequest from '@/api/api';

export const GET_USERS_FETCHING = 'GET_USERS/FETCHING';
export const GET_USERS_SUCCESS = 'GET_USERS/SUCCESS';
export const GET_USERS_ERROR = 'GET_USERS/ERROR';

const usersFetching = () => ({
  type: GET_USERS_FETCHING,
});

const usersSuccess = (users) => ({
  type: GET_USERS_SUCCESS,
  payload: users,
});

const usersError = (error) => ({
  type: GET_USERS_ERROR,
  payload: error,
});

export const getUsers = () => async (dispatch) => {
  dispatch(usersFetching());
  try {
    const { data } = await apiRequest.get(
      '/api/users?populate=avatar,payrolls.organisation',
    );

    dispatch(usersSuccess(data));
  } catch (error) {
    dispatch(usersError(error));
  }
};
