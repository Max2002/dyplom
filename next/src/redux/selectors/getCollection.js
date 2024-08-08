import { createSelector } from 'reselect';

const getCollection = (state) => state.collection;

const collectionSelector = createSelector(
  getCollection,
  ({ collection }) => collection,
);

export default collectionSelector;
