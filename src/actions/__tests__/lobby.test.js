import * as actions from '../lobby';
import * as con from '../../constants/lobby';

describe('Lobby actions', () => {
  let tables;
  beforeEach(() => {
    tables = new Map();
  });

  it('Should create an action to init tables', () => {
    const expectedAction = {
      type: con.INIT_TABLES,
      payload: {tables}
    };

    expect(actions.initTablesAction(tables)).toEqual(expectedAction);
  });

  it('Should create an action to add new table', () => {
    const expectedAction = {
      type: con.ADD_TABLE,
      payload: {tables}
    };

    expect(actions.addTableAction(tables)).toEqual(expectedAction);
  });

  it('Should create an action to remove table', () => {
    const expectedAction = {
      type: con.REMOVE_TABLE,
      payload: {tables}
    };

    expect(actions.removeTableAction(tables)).toEqual(expectedAction);
  });

  it('Should create an action to update table', () => {
    const expectedAction = {
      type: con.UPDATE_TABLE,
      payload: {tables}
    };

    expect(actions.updateTableAction(tables)).toEqual(expectedAction);
  });

  it('Should create an action to set error message', () => {
    const errorMessage = 'error';
    const expectedAction = {
      type: con.SET_ERROR_MESSAGE,
      payload: {errorMessage}
    };

    expect(actions.setErrorMessageAction(errorMessage)).toEqual(expectedAction);
  });
});