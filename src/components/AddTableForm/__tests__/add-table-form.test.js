import React from 'react';
import {mount} from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import AddTableForm from '../index';

import {mockTables} from '../../../utils/mock-tables';

describe('AddTableForm component', () => {
  injectTapEventPlugin();

  let component = null;
  let props = {
    tables: mockTables,
    onFormSubmit: jest.fn()
  };

  beforeEach(() => {
    component = mount(
      <MuiThemeProvider>
        <AddTableForm {...props}/>
      </MuiThemeProvider>
    );
  });

  it('Component should be rendered', () => {
    expect(component).toBeDefined();
  });
});