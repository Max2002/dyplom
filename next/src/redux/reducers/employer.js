import {
  GET_EMPLOYER_ERROR,
  GET_EMPLOYER_SUCCESS,
  GET_EMPLOYER_FETCHING,
  RELEASE_EMPLOYER,
} from '../actionCreator/getEmployer';

const initialState = {
  organisations: [],
  employer: {},
  loading: false,
  error: null,
};

const employer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_EMPLOYER_FETCHING: {
      return { ...state, loading: true, error: null };
    }
    case GET_EMPLOYER_SUCCESS: {
      return {
        ...state,
        employer: payload.employer,
        organisations: payload.organisations,
        loading: false,
        error: null,
      };
    }
    case GET_EMPLOYER_ERROR: {
      return { ...state, payload, loading: false };
    }
    case RELEASE_EMPLOYER: {
      return initialState;
    }
    default:
      return state;
  }
};

export default employer;
