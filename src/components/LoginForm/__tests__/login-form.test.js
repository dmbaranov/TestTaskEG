import React from 'react';
import {mount} from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import LoginForm from '../index';

describe('LoginForm component', () => {
  injectTapEventPlugin();

  let component = null;
  let props = {
    onFormSubmit: jest.fn(),
    errorMessage: ''
  };

  beforeEach(() => {
    component = mount(
      <MuiThemeProvider>
        <LoginForm {...props}/>
      </MuiThemeProvider>
    );
  });

  it('Component should be rendered', () => {
    expect(component).toBeDefined();
  });
});