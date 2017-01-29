import React from 'react';
import {mount} from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import TablesList from '../index';

import {mockTables} from '../../../utils/mock-tables';

describe('TablesList component', () => {
  injectTapEventPlugin();

  let component = null;
  let props = {
    tables: mockTables,
    removeTable: jest.fn(),
    userType: 'admin'
  };

  beforeEach(() => {
    component = mount(
      <MuiThemeProvider>
        <TablesList {...props}/>
      </MuiThemeProvider>
    );
  });

  it('Component should be rendered', () => {
    expect(component).toBeDefined();
  });
});