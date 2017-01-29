import * as con from '../constants/lobby';

/**
 * We receive an array of tables from the server,
 * convert it to the Map (in order to get an easier control over them)
 * and save it to the storage.
 *
 * @param tablesArray - array of tables from the server
 * @return {function(*)} - action function
 */
export function initTables(tablesArray) {
  return dispatch => {
    const tables = new Map();

    tablesArray.map(item => { // eslint-disable-line array-callback-return
      tables.set(item.id, item);
    });

    dispatch(initTablesAction(tables));
  }
}

export function initTablesAction(tables) {
  return {
    type: con.INIT_TABLES,
    payload: {tables}
  };
}

/**
 * At first we convert our Map to array in order to add a new table
 * to any place we want. That array consists of array with 2 elements -
 * [0] - id of the table, [1] - table object.
 * We are searching an id after which we need to add a new table
 * and inserting it using splice. In case if addAfter is equal to -1,
 * we add it in the beginning. After that we convert array to the Map
 * and save it to the store.
 *
 * @param oldTables - current tables Map
 * @param newTable - new table object
 * @param addAfter - id of the table after which we are going to add a new table
 * @return {function(*)} - action function
 */
export function addTable(oldTables, newTable, addAfter) {
  return dispatch => {
    const tablesArray = Array.from(oldTables);
    const newTableItem = [newTable.id, newTable];

    if (addAfter === -1) {
      tablesArray.splice(0, 0, newTableItem);
    }
    else {
      for (let i = 0; i < tablesArray.length; i++) {
        if (tablesArray[i][0] === addAfter) {
          tablesArray.splice(i + 1, 0, newTableItem);
          break;
        }
      }
    }

    const tables = new Map(tablesArray);

    dispatch(addTableAction(tables));
  }
}

export function addTableAction(tables) {
  return {
    type: con.ADD_TABLE,
    payload: {tables}
  }
}

/**
 * Simply remove a table from the Map
 * using delete() method.
 *
 * @param oldTables - current tables Map
 * @param tableId - id of the table that we need to remove
 * @return {function(*)} - action function
 */
export function removeTable(oldTables, tableId) {
  return dispatch => {
    const tables = new Map(oldTables);
    tables.delete(tableId);

    dispatch(removeTableAction(tables));
  }
}

export function removeTableAction(tables) {
  return {
    type: con.REMOVE_TABLE,
    payload: {tables}
  };
}

/**
 * Map's method set() simply updates a value.
 *
 * @param oldTables - current tables Map
 * @param tableToUpdate - updated table object
 * @return {function(*)} - action function
 */
export function updateTable(oldTables, tableToUpdate) {
  return dispatch => {
    const tables = new Map(oldTables);
    tables.set(tableToUpdate.id, tableToUpdate);

    dispatch(updateTableAction(tables));
  }
}

export function updateTableAction(tables) {
  return {
    type: con.UPDATE_TABLE,
    payload: {tables}
  };
}

/**
 * Shows error message if there was error while removing a table
 * @param message - error message
 * @return {function(*)} - action function
 */
export function setErrorMessage(message) {
  return dispatch => {
    dispatch(setErrorMessageAction(message));
  };
}

export function setErrorMessageAction(errorMessage) {
  return {
    type: con.SET_ERROR_MESSAGE,
    payload: {errorMessage}
  }
}