import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';

import LoginForm from '../../components/LoginForm';

import './style.css';

class LoginContainer extends Component {
  static propTypes = {
    socket: PropTypes.object.isRequired
  };

  handleLogin = (login, password) => {
    const {socket} = this.props;

    socket.send(JSON.stringify({
      "$type": "login",
      "username": login,
      "password": password
    }));
  };

  render() {
    const {errorMessage} = this.props.auth;

    return (
      <div className='loginContainer'>
        <LoginForm onFormSubmit={this.handleLogin} errorMessage={errorMessage}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(LoginContainer);