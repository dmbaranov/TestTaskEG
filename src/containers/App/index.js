import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import LoginContainer from '../Login';
import LobbyContainer from '../Lobby';

import * as authActions from '../../actions/auth';
import * as lobbyActions from '../../actions/lobby';

class App extends Component {
  constructor() {
    super();

    // For the material-ui
    injectTapEventPlugin();

    this.socket = new WebSocket('wss://js-assignment.evolutiongaming.com/ws_api');
    this.socket.onmessage = this.messageFromSocket;
  }

  messageFromSocket = message => {
    const messageData = JSON.parse(message.data);
    const tablesList = this.props.lobby.tables;

    // TODO: move this to another function or container
    switch (messageData.$type) {
      case 'login_successful':
        const {loginSuccessful} = this.props.authActions;
        const {user_type} = messageData;

        loginSuccessful(user_type);
        break;
      case 'login_failed':
        const {loginFailed} = this.props.authActions;

        loginFailed('Wrong login or password!');
        break;

      case 'table_list':
        const {initTables} = this.props.lobbyActions;
        const {tables} = messageData;

        initTables(tables);
        break;

      case 'table_added':
        const tableToAdd = messageData.table;
        const addAfter = messageData.after_id;
        const {addTable} = this.props.lobbyActions;

        addTable(tablesList, tableToAdd, addAfter);
        break;

      case 'table_removed':
        const tableId = messageData.id;
        const {removeTable} = this.props.lobbyActions;

        removeTable(tablesList, tableId);
        break;

      case 'table_updated':
        const tableToUpdate = messageData.table;
        const {updateTable} = this.props.lobbyActions;

        updateTable(tables, tableToUpdate);
        break;

      case 'removal_failed':
        const message = 'An error has occurred while removing table. Try again later!';
        const {setErrorMessage} = this.props.lobbyActions;

        setErrorMessage(message);
        break;

      default:
        console.log('Unknown action');
    }
  };

  getMainScreen = () => {
    const {isLoggedIn, userType} = this.props.auth;

    if (isLoggedIn) {
      return <LobbyContainer socket={this.socket} userType={userType}/>;
    }
    else {
      return <LoginContainer socket={this.socket}/>;
    }
  };

  render() {
    return (
      <MuiThemeProvider>
        {this.getMainScreen()}
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    lobby: state.lobby
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    lobbyActions: bindActionCreators(lobbyActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
