import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Dialog, FlatButton, AutoComplete, Checkbox } from 'material-ui';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

class ReplaceBeerModal extends Component {

  constructor() {
    super();
    this.state = {
      open: false,
      selectedTap: null,
      beer: '',
      slack: true
    };
    _.bindAll(this, 'open', 'close', 'onTapSelected', 'onBeerUpdate', 'onCheck', 'submit');
  }

  open() {
    this.setState({
      open: true
    });
  }

  close() {
    this.setState({
      open: false
    });
  }

  onTapSelected(rows) {
    console.log('up');
    this.setState({
      selectedTap: rows.length ? rows[0]: null
    });
  }

  onBeerUpdate(text) {
    this.setState({
      beer: text
    });
  }

  onCheck(event, isChecked) {
    this.setState({
      slack: isChecked
    });
  }

  submit() {
    console.log(this.state);
    this.close();
  }

  renderTable() {
    this.taps = _.orderBy(this.props.taps, ['location.room', 'handle']);
    const rows = this.taps.map((tap, index) => {
      return (
        <TableRow key={index} selected={this.state.selectedTap === index}>
          <TableRowColumn>{tap.beer ? tap.beer.name : 'Empty'}</TableRowColumn>
          <TableRowColumn>{tap.location.building}</TableRowColumn>
          <TableRowColumn>{tap.location.room}</TableRowColumn>
        </TableRow>
      );
    });

    return (
      <Table height="200px" onRowSelection={this.onTapSelected}>
        <TableHeader adjustForCheckbox={true} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Current Beer</TableHeaderColumn>
            <TableHeaderColumn>Building</TableHeaderColumn>
            <TableHeaderColumn>Room</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={true}>
          {rows}
        </TableBody>
      </Table>
    );
  }

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={false}
        onTouchTap={() => this.close()}
      />,
      <FlatButton
        label="Tap It"
        primary={true}
        onTouchTap={() => this.submit()}
      />
    ];

    return (
      <Dialog
        actions={actions}
        modal={false}
        open={this.state.open}
        autoScrollBodyContent={true}
        onRequestClose={() => this.close()}
      >
        <strong>Select a beer to replace:</strong>
        {this.renderTable()}
        <AutoComplete
          hintText="Search"
          dataSource={['abc', 'dce']}
          onUpdateInput={this.onBeerUpdate}
          searchText={this.state.beer}
          floatingLabelText="New Beer"
          fullWidth={true}
        />
        <div className="spacer" />
        <Checkbox
          label="Send Slack Notification"
          checked={this.state.slack}
          onCheck={this.onCheck}
        />
      </Dialog>
    );
  }
}

export default ReplaceBeerModal;
