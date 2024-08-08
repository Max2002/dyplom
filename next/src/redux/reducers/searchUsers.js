import {
  GET_SEARCH_USERS_ERROR,
  GET_SEARCH_USERS_SUCCESS,
  GET_SEARCH_USERS_FETCHING,
} from '../actionCreator/getSearchUsers';

const initialState = {
  searchUsers: [],
  loading: false,
  error: null,
};

const searchUsers = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_SEARCH_USERS_FETCHING: {
      return { ...state, loading: true, error: null };
    }
    case GET_SEARCH_USERS_SUCCESS: {
      return {
        searchUsers: payload,
        loading: false,
        error: null,
      };
    }
    case GET_SEARCH_USERS_ERROR: {
      return { ...state, payload, loading: false };
    }
    default:
      return state;
  }
};

export default searchUsers;
