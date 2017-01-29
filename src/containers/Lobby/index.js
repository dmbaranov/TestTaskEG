import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Snackbar from 'material-ui/Snackbar';

import TablesList from '../../components/TablesList';
import AddTableForm from '../../components/AddTableForm';

class LobbyContainer extends Component {
  static propTypes = {
    socket: PropTypes.object.isRequired,
  };

  constructor() {
    super();

    this.state = {
      snackbarOpened: false
    };
  }

  componentDidMount() {
    const {socket} = this.props;

    socket.send(JSON.stringify({
      "$type": "subscribe_tables"
    }));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lobby.errorMessage !== '' && this.state.snackbarOpened === false) {
      this.showSnackbar();
    }
  }

  addNewTable = (name, participants, addAfter) => {
    this.props.socket.send(JSON.stringify({
      "$type": "add_table",
      "after_id": addAfter,
      "table": {
        "name": name,
        "participants": participants
      }
    }));
  };

  removeTable = tableId => {
    this.props.socket.send(JSON.stringify({
      "$type": "remove_table",
      "id": tableId
    }));
  };

  showSnackbar = () => {
    this.setState({
      snackbarOpened: true
    });
  };

  hideSnackbar = () => {
    this.setState({
      snackbarOpened: false
    });
  };

  render() {
    const {userType} = this.props;
    const {tables, errorMessage} = this.props.lobby;

    return (
      <div>
        <TablesList tables={tables} removeTable={this.removeTable} userType={userType}/>

        {userType === 'admin'
          ? <AddTableForm onFormSubmit={this.addNewTable} tables={tables}/>
          : null
        }
        <Snackbar message={errorMessage}
                  open={this.state.snackbarOpened}
                  autoHideDuration={3000}
                  onRequestClose={this.hideSnackbar}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    lobby: state.lobby,
  };
}

export default connect(mapStateToProps)(LobbyContainer);