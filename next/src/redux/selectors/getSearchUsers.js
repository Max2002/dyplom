import { createSelector } from 'reselect';

const getSearchUsers = (state) => state.searchUsers;

export const searchUsersSelector = createSelector(
  getSearchUsers,
  ({ searchUsers }) => searchUsers,
);
