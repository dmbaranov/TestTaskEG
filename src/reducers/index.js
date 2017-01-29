import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import auth from './auth';
import lobby from './lobby';

import * as con from '../constants/auth';

const appReducer = combineReducers({
  auth,
  lobby,
  routing
});


/**
 * In some of my application I use authentication system as well.
 * And if user wants to logout and login with another account,
 * we need to clear state of the whole app. That's how I'm doing this.
 */
const rootReducer = (state, action) => {
  if (action.type === con.LOGOUT_SUCCESS) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;