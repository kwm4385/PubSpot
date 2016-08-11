import React, {Component} from 'react';
import { Dialog, FlatButton, AutoComplete, Checkbox, MenuItem } from 'material-ui';

export default class ConfirmationDialog extends Component {

  constructor() {
    super();
    this.state = {
      open: false
    };
    _.bindAll(this, 'open', 'close');
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onTouchTap={() => this.close()}
      />,
      <FlatButton
        label="Confirm"
        primary={true}
        onTouchTap={() => this.props.onConfirm()}
      />
    ];

    return (
      <Dialog
        actions={actions}
        modal={true}
        open={this.state.open}
        autoScrollBodyContent={true}
      >
        {this.props.children}
      </Dialog>
    );
  }
}
