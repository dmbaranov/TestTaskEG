import React, {PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Person from 'material-ui/svg-icons/social/person'
import PersonOutline from 'material-ui/svg-icons/social/person-outline';

import './style.css';

const AOP = 12; // AMOUNT_OF_PARTICIPANTS

const Table = ({id, participants, name, userType, removeTable}) => {
  const drawParticipants = () => {
    const participantsElements = [];

    for (let i = 0; i < AOP; i++) {
      participantsElements.push(
        <span key={i}>
          {i < participants
            ? <Person/>
            : <PersonOutline/>
          }
        </span>
      )
    }

    return participantsElements;
  };

  // That's the feature I invented :)
  // I noticed, that the first word in the table's name
  // is color. So I decided to make kind of 'league'.
  // League's name font color is equal to its name.
  const splittedName = name.split(' ');
  const league = splittedName.splice(0, 1)[0];
  const resultName = splittedName.join(' ');
  const color = league === 'red' ? 'white' : league;


  return (
    <div className='table'>
      <div className='table__league' style={{
        color: color
      }}>{league.toUpperCase()}</div>
      <div className='table__title'>{resultName}</div>
      <div>
        {drawParticipants(participants)}
      </div>
      { userType === 'admin'
        ? <RaisedButton className='table__button-remove' label="X" onTouchTap={removeTable.bind(this, id)}/>
        : null
      }
    </div>
  )
};

Table.propTypes = {
  id: PropTypes.number.isRequired,
  participants: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  name: PropTypes.string.isRequired,
  removeTable: PropTypes.func.isRequired
};

export default Table;