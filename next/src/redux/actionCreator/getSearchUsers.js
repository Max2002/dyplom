import apiRequest from '@/api/api';

export const GET_SEARCH_USERS_FETCHING = 'GET_SEARCH_USERS/FETCHING';
export const GET_SEARCH_USERS_SUCCESS = 'GET_SEARCH_USERS/SUCCESS';
export const GET_SEARCH_USERS_ERROR = 'GET_SEARCH_USERS/ERROR';

const searchUsersFetching = () => ({
  type: GET_SEARCH_USERS_FETCHING,
});

const searchUsersSuccess = (searchUsers) => ({
  type: GET_SEARCH_USERS_SUCCESS,
  payload: searchUsers,
});

const searchUsersError = (error) => ({
  type: GET_SEARCH_USERS_ERROR,
  payload: error,
});

export const getSearchUsers = (paramSearch, userId) => async (dispatch) => {
  dispatch(searchUsersFetching());
  try {
    const { data } = await apiRequest.get(
      '/api/users?populate=avatar,organisations',
    );

    if (paramSearch) {
      const filterData = data.filter(
        ({ id, username, email }) =>
          (username.includes(paramSearch) || email.includes(paramSearch)) &&
          id !== userId,
      );

      dispatch(searchUsersSuccess(filterData));
    } else {
      dispatch(searchUsersSuccess([]));
    }
  } catch (error) {
    dispatch(searchUsersError(error));
  }
};
