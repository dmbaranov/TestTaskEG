import React from 'react';
import {mount} from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Table from '../index';

describe('Table component', () => {
  injectTapEventPlugin();

  let component = null;
  let props = {
    id: 123,
    participants: 8,
    name: 'name',
    removeTable: jest.fn(),
    userType: 'admin'
  };

  beforeEach(() => {
    component = mount(
      <MuiThemeProvider>
        <Table {...props}/>
      </MuiThemeProvider>
    );
  });

  it('Component should be rendered', () => {
    expect(component).toBeDefined();
  });
});