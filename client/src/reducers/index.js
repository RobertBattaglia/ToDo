import { combineReducers } from 'redux';

import todos from './todos';
import user from './user';

export default combineReducers({
  todos,
  user
});
