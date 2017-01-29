import React, {Component, PropTypes} from 'react';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import './style.css';

class LoginForm extends Component {
  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
  };

  static defaultProps = {
    errorMessage: ''
  };

  constructor() {
    super();

    this.state = {
      login: 'user1234',
      password: 'password1234',
      snackbarOpened: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorMessage.length > 0 && this.state.snackbarOpened === false) {
      this.showSnackbar();
    }
  }

  handleInput = (field, e) => {
    this.setState({
      [field]: e.target.value
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.props.onFormSubmit(this.state.login, this.state.password);

    this.setState({
      login: '',
      password: ''
    });
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
    const {errorMessage} = this.props;

    return (
      <div className='loginForm'>
        <h3 className='loginForm__title'>Please, log in to the system:</h3>
        <form onSubmit={this.handleFormSubmit}>
          <TextField floatingLabelText="Login"
                     value={this.state.login}
                     fullWidth={true}
                     onChange={this.handleInput.bind(this, 'login')}/>
          <TextField floatingLabelText="Password"
                     value={this.state.password}
                     fullWidth={true}
                     onChange={this.handleInput.bind(this, 'password')}/>
          <button className='loginForm__fake-button' type='submit'/> {/* hack for form.onSubmit */}
          <RaisedButton className='loginForm__login-button'
                        label="Login"
                        onTouchTap={this.handleFormSubmit}/>
        </form>
        <Snackbar open={this.state.snackbarOpened}
                  message={errorMessage}
                  autoHideDuration={3000}
                  onRequestClose={this.hideSnackbar}/>
      </div>
    )
  }
}

export default LoginForm;