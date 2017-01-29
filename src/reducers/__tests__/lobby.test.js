import * as con from '../../constants/lobby';
import reducer from '../lobby';
import {mockTables} from '../../utils/mock-tables';

describe('Lobby reducer', () => {
  let initialState = null, errorMessage = '';
  let oldTables = null;

  beforeEach(() => {
    initialState = {
      tables: Map,
      errorMessage: ''
    };

    oldTables = new Map(mockTables);
  });

  it('Should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('Should handle INIT_TABLES', () => {
    const tables = new Map();

    expect(reducer(initialState, {
      type: con.INIT_TABLES,
      payload: {tables}
    })).toEqual({
      tables: tables,
      errorMessage: ''
    });
  });

  it('Should handle ADD_TABLE', () => {
    const tables = new Map(oldTables);
    tables.set(321, {
      id: 321,
      name: 'name321',
      participants: 4
    });

    expect(reducer({
      tables: oldTables,
      errorMessage: errorMessage
    }, {
      type: con.ADD_TABLE,
      payload: {tables}
    })).toEqual({
      tables: tables,
      errorMessage: ''
    });
  });

  it('Should handle REMOVE_TABLE', () => {
    const tables = new Map(oldTables);
    tables.delete(456);

    expect(reducer({
      tables: oldTables,
      errorMessage: errorMessage
    }, {
      type: con.REMOVE_TABLE,
      payload: {tables}
    })).toEqual({
      tables: tables,
      errorMessage: ''
    });
  });

  it('Should handle SET_ERROR_MESSAGE', () => {
    const tables = new Map(oldTables);
    const error = 'error';

    expect(reducer({
      tables: oldTables,
      errorMessage: errorMessage
    }, {
      type: con.SET_ERROR_MESSAGE,
      payload: {
        errorMessage: error
      }
    })).toEqual({
      tables: tables,
      errorMessage: error
    });
  });
});
