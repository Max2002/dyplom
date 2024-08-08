import apiRequest from '@/api/api';

export const GET_ORGANISATIONS_FETCHING = 'GET_ORGANISATIONS/FETCHING';
export const GET_ORGANISATIONS_SUCCESS = 'GET_ORGANISATIONS/SUCCESS';
export const GET_ORGANISATIONS_ERROR = 'GET_ORGANISATIONS/ERROR';

const organisationsFetching = () => ({
  type: GET_ORGANISATIONS_FETCHING,
});

const organisationsSuccess = (organisationsByName) => ({
  type: GET_ORGANISATIONS_SUCCESS,
  payload: organisationsByName,
});

const organisationsError = (error) => ({
  type: GET_ORGANISATIONS_ERROR,
  payload: error,
});

export const getOrganisationsByName = (name) => async (dispatch) => {
  dispatch(organisationsFetching());
  try {
    const { data } = await apiRequest.get(
      `/api/get-organisations-by-name/${name}`,
    );

    dispatch(organisationsSuccess(data));
  } catch (error) {
    dispatch(organisationsError(error));
  }
};
