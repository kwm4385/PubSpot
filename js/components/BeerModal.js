import React, {Component} from 'react';
import { Dialog, FlatButton } from 'material-ui';

export default class BeerModal extends Component {

  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={() => this.handleClose()}
      />,
    ];

    return (
      <div>
        <FlatButton label="More..." primary={true} onClick={() => this.handleOpen()} />
        <Dialog
          title={this.props.data.nameDisplay}
          actions={actions}
          modal={false}
          open={this.state.open}
          autoScrollBodyContent={true}
          onRequestClose={() => this.handleClose()}
        >
        fdsf
        </Dialog>
      </div>
    );
  }
}
