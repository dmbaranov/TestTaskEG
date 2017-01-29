import * as con from '../constants/auth';

/**
 * Shots when user has logged in successfully
 * @param userType - type of current user (user, admin, moderator, etc..)
 * @return {function(*)}
 */
export function loginSuccessful(userType) {
  return dispatch => {
    dispatch(loginSuccessfulAction(userType));
  };
}

export function loginSuccessfulAction(userType) {
  return {
    type: con.LOGIN_SUCCESS,
    payload: {userType}
  };
}

/**
 * Shots when there was an error when user tried to login,
 * e.g. wrong username/password
 * @param errorMessage - message that will be shown
 * @return {function(*)}
 */
export function loginFailed(errorMessage) {
  return dispatch => {
    dispatch(loginFailedAction(errorMessage));
  }
}

export function loginFailedAction(errorMessage) {
  return {
    type: con.LOGIN_FAILED,
    payload: {errorMessage}
  };
}