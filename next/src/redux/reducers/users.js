import {
  GET_USERS_ERROR,
  GET_USERS_SUCCESS,
  GET_USERS_FETCHING,
} from '../actionCreator/getUsers';

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const users = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS_FETCHING: {
      return { ...state, loading: true, error: null };
    }
    case GET_USERS_SUCCESS: {
      return {
        users: payload,
        loading: false,
        error: null,
      };
    }
    case GET_USERS_ERROR: {
      return { ...state, payload, loading: false };
    }
    default:
      return state;
  }
};

export default users;
