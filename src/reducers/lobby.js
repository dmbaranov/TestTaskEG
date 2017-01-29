import * as con from '../constants/lobby';

const initialState = {
  tables: Map,
  errorMessage: ''
};

export default function lobby(state=initialState, action) {
  switch (action.type) {
    case con.INIT_TABLES:
      return {
        ...state,
        tables: action.payload.tables
      };

    case con.ADD_TABLE:
      return {
        ...state,
        tables: action.payload.tables
      };

    case con.REMOVE_TABLE:
      return {
        ...state,
        tables: action.payload.tables,
        errorMessage: ''
      };

    case con.SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload.errorMessage
      };

    default:
      return state;
  }
}