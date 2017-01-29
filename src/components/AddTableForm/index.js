import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import './style.css';

class AddTableForm extends Component {
  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
    tables: PropTypes.any.isRequired
  };

  constructor() {
    super();

    this.state = {
      name: '',
      participants: '',
      addAfter: -1,
      selectorOptions: []
    };
  }

  componentWillReceiveProps(nextProps) {
    // We generate selector options here in order to prevent calling this function
    // on every render (e.g. when we starting to type something).
    // Also we need to call it when component was mount, that's why we check
    // array's length.
    if (this.props.tables !== nextProps.tables || this.state.selectorOptions.length === 0) {
      this.generateSelectOptions(nextProps.tables);
    }
  }

  handleInput = (field, e) => {
    this.setState({
      [field]: e.target.value
    });
  };

  handleSelect = (e, index, value) => {
    this.setState({
      addAfter: value
    });
  };

  handleFormSubmit = () => {
    this.props.onFormSubmit(this.state.name, this.state.participants, this.state.addAfter);

    this.setState({
      name: '',
      participants: '',
      addAfter: -1
    });
  };

  generateSelectOptions = tables => {
    const selectorOptions = [];

    if (typeof tables === 'object') {
      tables.forEach(item => {
        selectorOptions.push(
          <MenuItem key={item.id}
                    value={item.id}
                    primaryText={item.name}
                    secondaryText={item.id}/>
        )
      });
    }

    this.setState({selectorOptions});
  };

  render() {
    return (
      <div className='addTableForm'>
        <form>
          <TextField fullWidth={true}
                     floatingLabelText="Name"
                     value={this.state.name}
                     onChange={this.handleInput.bind(this, 'name')}/>
          <TextField fullWidth={true}
                     floatingLabelText="Participants"
                     value={this.state.participants}
                     onChange={this.handleInput.bind(this, 'participants')}/>
          <SelectField fullWidth={true}
                       floatingLabelText="Add after"
                       value={this.state.addAfter}
                       onChange={this.handleSelect}>
            {this.state.selectorOptions}
          </SelectField>
          <RaisedButton label="Add table" fullWidth={true} onTouchTap={this.handleFormSubmit}/>
        </form>
      </div>
    )
  }
}

export default AddTableForm;