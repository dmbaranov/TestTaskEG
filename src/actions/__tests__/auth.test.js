import * as actions from '../auth';
import * as con from '../../constants/auth';

describe('Auth actions', () => {
  it('Should create an action to authenticate user', () => {
    const userType = 'userType';

    const expectedAction = {
      type: con.LOGIN_SUCCESS,
      payload: {userType}
    };

    expect(actions.loginSuccessfulAction(userType)).toEqual(expectedAction);
  });

  it('Should create an action to failed authentication', () => {
    const errorMessage = 'errorMessage';

    const expectedAction = {
      type: con.LOGIN_FAILED,
      payload: {errorMessage}
    };

    expect(actions.loginFailedAction(errorMessage)).toEqual(expectedAction);
  });
});