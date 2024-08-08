import apiRequest from '@/api/api';

export const GET_COLLECTION_FETCHING = 'GET_COLLECTION/FETCHING';
export const GET_COLLECTION_SUCCESS = 'GET_COLLECTION/SUCCESS';
export const GET_COLLECTION_ERROR = 'GET_COLLECTION/ERROR';

const collectionFetching = () => ({
  type: GET_COLLECTION_FETCHING,
});

const collectionSuccess = (collection) => ({
  type: GET_COLLECTION_SUCCESS,
  payload: collection,
});

const collectionError = (error) => ({
  type: GET_COLLECTION_ERROR,
  payload: error,
});

export const getCollection = (endpoint) => async (dispatch) => {
  dispatch(collectionFetching());
  try {
    const { data } = await apiRequest.get(endpoint);

    dispatch(collectionSuccess(data));
  } catch (error) {
    dispatch(collectionError(error));
  }
};
