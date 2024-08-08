import apiRequest from '@/api/api';

export const GET_USER_FETCHING = 'GET_USER/FETCHING';
export const GET_USER_SUCCESS = 'GET_USER/SUCCESS';
export const GET_USER_ERROR = 'GET_USER/ERROR';
export const LOG_OR_REG = 'LOG_OR_REG';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const LOG_OUT = 'LOG_OUT';
export const GET_ACTIVE_ORGANISATION = 'GET_ACTIVE_ORGANISATION';

const userFetching = () => ({
  type: GET_USER_FETCHING,
});

const userSuccess = (user, token) => ({
  type: GET_USER_SUCCESS,
  payload: { user, token },
});

const userError = (error) => ({
  type: GET_USER_ERROR,
  payload: error,
});

const logOrReg = (user, token) => ({
  type: LOG_OR_REG,
  payload: { user, token },
});

export const changePass = (token) => ({
  type: CHANGE_PASSWORD,
  payload: token,
});

export const logOut = () => {
  document.cookie = `userId=;Max-Age=0`;
  document.cookie = `idOrganisation=;Max-Age=0`;

  return { type: LOG_OUT };
};

const activeOrganisation = (organisation) => ({
  type: GET_ACTIVE_ORGANISATION,
  payload: organisation,
});

const updateUser = async (token) => {
  const { data: user } = await apiRequest.get(
    '/api/users/me?populate=avatar,payrolls.organisation.logo',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  localStorage.setItem('token', token);
  document.cookie = `userId=${user.id}`;

  if (user.payrolls.length !== 0) {
    document.cookie = `idOrganisation=${user.payrolls[0].organisation.id}`;

    return { user, organisation: user?.payrolls[0].organisation };
  }

  return { user, organisation: null };
};

export const setActiveOrganisation = (id, name, logo) => async (dispatch) => {
  document.cookie = `idOrganisation=${id}`;
  dispatch(activeOrganisation({ id, name, logo }));
};

export const auth = (email, password) => async (dispatch) => {
  dispatch(userFetching());
  try {
    const {
      data: { jwt },
    } = await apiRequest.post(`/api/auth/local`, {
      identifier: email,
      password,
    });

    if (jwt) {
      const { user, organisation } = await updateUser(jwt);

      if (organisation) {
        dispatch(
          activeOrganisation({
            id: organisation.id,
            name: organisation.name,
            logo: organisation.logo[0].url,
          }),
        );
      }
      dispatch(logOrReg(user, jwt));

      return { status: true, idOrg: organisation?.id };
    }
  } catch (error) {
    dispatch(userError(error));

    return { status: false, idOrg: null };
  }
};

export const registration = (data, owner) => async (dispatch) => {
  dispatch(userFetching());
  try {
    const {
      data: { jwt },
    } = await apiRequest.post(`/api/auth/local/register`, {
      ...data,
      owner,
    });

    if (jwt) {
      const { user, organisation } = await updateUser(jwt);

      if (organisation) {
        dispatch(
          activeOrganisation({
            id: organisation.id,
            name: organisation.name,
            logo: organisation.logo[0].url,
          }),
        );
      }
      dispatch(logOrReg(user, jwt));

      return { status: true, idOrg: organisation?.id };
    }
  } catch (error) {
    dispatch(userError(error));

    return { status: false, idOrg: null };
  }
};

export const getUser = (token) => async (dispatch) => {
  dispatch(userFetching());
  try {
    const { data } = await apiRequest.get(
      '/api/users/me?populate=avatar,payrolls.organisation.logo',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (data.payrolls.length !== 0) {
      document.cookie = `idOrganisation=${data.payrolls[0].organisation.id}`;
      dispatch(
        activeOrganisation({
          id: data.payrolls[0].organisation.id,
          name: data.payrolls[0].organisation.name,
          logo: data.payrolls[0].organisation.logo[0].url,
        }),
      );
    }
    document.cookie = `userId=${data.id}`;
    dispatch(userSuccess(data, token));
  } catch (error) {
    dispatch(userError(error));
  }
};
