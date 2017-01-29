import * as con from '../../constants/auth';
import reducer from '../auth';

describe('Auth reducer', () => {
  let initialState = null;
  beforeEach(() => {
    initialState = {
      isLoggedIn: false,
      userType: null,
      errorMessage: ''
    };
  });

  it('Should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('Should handle LOGIN_SUCCESS', () => {
    expect(reducer(initialState, {
      type: con.LOGIN_SUCCESS,
      payload: {
        userType: 'admin'
      }
    })).toEqual({
      isLoggedIn: true,
      userType: 'admin',
      errorMessage: ''
    });
  });

  it('Should handle LOGIN_FAILED', () => {
    expect(reducer(initialState, {
      type: con.LOGIN_FAILED,
      payload: {
        errorMessage: 'error'
      }
    })).toEqual({
      isLoggedIn: false,
      userType: null,
      errorMessage: 'error'
    });
  });
});