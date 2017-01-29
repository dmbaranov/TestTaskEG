import * as con from '../constants/auth';

const initialState = {
  isLoggedIn: false,
  userType: null,
  errorMessage: ''
};

export default function auth(state=initialState, action) {
  switch (action.type) {
    case con.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userType: action.payload.userType,
        errorMessage: ''
      };

    case con.LOGIN_FAILED:
      return {
        ...state,
        errorMessage: action.payload.errorMessage
      };

    default:
      return state;
  }
}