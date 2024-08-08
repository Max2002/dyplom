import {
  GET_USER_ERROR,
  GET_USER_SUCCESS,
  GET_USER_FETCHING,
  LOG_OR_REG,
  CHANGE_PASSWORD,
  LOG_OUT,
  GET_ACTIVE_ORGANISATION,
} from '../actionCreator/getUser';

const initialState = {
  organisation: {},
  user: {},
  token: '',
  loading: false,
  error: null,
};

const user = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USER_FETCHING: {
      return { ...state, loading: true, error: null };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        loading: false,
        error: null,
      };
    }
    case GET_USER_ERROR: {
      return { ...state, payload, loading: false };
    }
    case LOG_OR_REG: {
      return { ...state, user: payload.user, token: payload.token };
    }
    case CHANGE_PASSWORD: {
      return { ...state, token: payload };
    }
    case LOG_OUT: {
      return initialState;
    }
    case GET_ACTIVE_ORGANISATION: {
      return { ...state, organisation: payload };
    }
    default:
      return state;
  }
};

export default user;
