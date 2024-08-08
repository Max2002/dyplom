import { createSelector } from 'reselect';

const getEmployer = (state) => state.employer;

export const employerSelector = createSelector(
  getEmployer,
  ({ employer }) => employer,
);

export const organisationsSelector = createSelector(
  getEmployer,
  ({ organisations }) => organisations,
);
