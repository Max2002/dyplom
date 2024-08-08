import { createSelector } from 'reselect';

const getUsers = (state) => state.users;

const usersSelector = createSelector(getUsers, ({ users }) => users);

export default usersSelector;
