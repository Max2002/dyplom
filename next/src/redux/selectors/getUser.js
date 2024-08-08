import { createSelector } from 'reselect';

const getUser = (state) => state.user;

export const userSelector = createSelector(getUser, ({ user }) => user);

export const idSelector = createSelector(userSelector, ({ id }) => id);

export const fullNameSelector = createSelector(
  userSelector,
  ({ name, surname }) => `${surname} ${name}`,
);

export const PIBSelector = createSelector(
  userSelector,
  ({ name, surname, fatherName }) => {
    if (name) {
      return `${surname} ${name[0]}.${fatherName[0]}.`;
    }

    return '';
  },
);

export const ownerSelector = createSelector(userSelector, ({ owner }) => owner);

export const avatarSelector = createSelector(
  userSelector,
  ({ avatar }) => avatar?.url,
);

export const activeOrgSelector = createSelector(
  getUser,
  ({ organisation }) => organisation,
);

export const tokenSelector = createSelector(getUser, ({ token }) => token);
