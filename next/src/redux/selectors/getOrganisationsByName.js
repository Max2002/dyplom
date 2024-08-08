import { createSelector } from 'reselect';

const getOrganisationsByName = (state) => state.organisationsByName;

const organisationsByNameSelector = createSelector(
  getOrganisationsByName,
  ({ organisationsByName }) => organisationsByName,
);

export default organisationsByNameSelector;
