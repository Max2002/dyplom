import {
  GET_COLLECTION_ERROR,
  GET_COLLECTION_SUCCESS,
  GET_COLLECTION_FETCHING,
} from '../actionCreator/getCollection';

const initialState = {
  collection: {},
  loading: false,
  error: null,
};

const collection = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_COLLECTION_FETCHING: {
      return { ...state, loading: true, error: null };
    }
    case GET_COLLECTION_SUCCESS: {
      return {
        collection: payload,
        loading: false,
        error: null,
      };
    }
    case GET_COLLECTION_ERROR: {
      return { ...state, payload, loading: false };
    }
    default:
      return state;
  }
};

export default collection;
