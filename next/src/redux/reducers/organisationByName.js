import {
  GET_ORGANISATIONS_ERROR,
  GET_ORGANISATIONS_SUCCESS,
  GET_ORGANISATIONS_FETCHING,
} from '../actionCreator/getOrganisationsByName';

const initialState = {
  organisationsByName: [],
  loading: false,
  error: null,
};

const organisationsByName = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ORGANISATIONS_FETCHING: {
      return { ...state, loading: true, error: null };
    }
    case GET_ORGANISATIONS_SUCCESS: {
      return {
        organisationsByName: payload,
        loading: false,
        error: null,
      };
    }
    case GET_ORGANISATIONS_ERROR: {
      return { ...state, payload, loading: false };
    }
    default:
      return state;
  }
};

export default organisationsByName;
