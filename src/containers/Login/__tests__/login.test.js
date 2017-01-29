import React from 'react';
import {Provider} from 'react-redux';
import {mount} from 'enzyme';
import {WebSocket} from 'mock-socket';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Login from '../index';

import configureStore from '../../../store/configureStore';

describe('Login container', () => {
  injectTapEventPlugin();

  const store = configureStore();
  let component = null;
  let props = {
    socket: new WebSocket('wss://js-assignment.evolutiongaming.com/ws_api')
  };

  beforeEach(() => {
    component = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <Login {...props}/>
        </MuiThemeProvider>
      </Provider>
    );
  });

  it('Container should be rendered', () => {
    expect(component).toBeDefined();
  });
});