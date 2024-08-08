import { combineReducers } from 'redux';
import collection from '@/redux/reducers/collection';
import user from '@/redux/reducers/user';
import users from '@/redux/reducers/users';
import employer from '@/redux/reducers/employer';
import organisationsByName from '@/redux/reducers/organisationByName';

const rootReducer = combineReducers({
  collection,
  user,
  users,
  employer,
  organisationsByName,
});

export default rootReducer;
