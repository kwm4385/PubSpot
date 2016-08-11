import React, {Component} from 'react';
import { Dialog, FlatButton, AutoComplete, Checkbox, MenuItem } from 'material-ui';

export default class ConfirmationDialog extends Component {

  constructor() {
    super();
    this.state = {
      open: false,
      onConfirm: _.noop
    };
    _.bindAll(this, 'open', 'close');
  }

  open(onConfirm) {
    this.setState({
      open: true,
      onConfirm
    });
  }

  close() {
    this.setState({
      open: false,
      onConfirm: _.noop
    });
  }

  confirm() {
    this.state.onConfirm();
    this.close();
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
        onTouchTap={() => this.confirm()}
      />
    ];

    return (
      <Dialog
        actions={actions}
        modal={true}
        title={this.props.title}
        open={this.state.open}
        autoScrollBodyContent={true}
      >
        {this.props.children}
      </Dialog>
    );
  }
}
