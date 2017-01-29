import React from 'react';

import Table from '../Table';

import './style.css';

const TablesList = ({tables, removeTable, userType}) => {
  const tablesList = [];

  if (typeof tables === 'object') {
    tables.forEach(item => {
      tablesList.push(
        <Table key={item.id}
               id={item.id}
               participants={item.participants}
               name={item.name}
               userType={userType}
               removeTable={removeTable}/>
      );
    });
  }

  return (
    <div className='tableList'>
      {tablesList}
    </div>
  );
};

export default TablesList;