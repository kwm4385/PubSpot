import React, {Component} from 'react';
import { Dialog, FlatButton, AutoComplete, Checkbox, MenuItem } from 'material-ui';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import ConfirmationDialog from './ConfirmationDialog';

class ReplaceBeerModal extends Component {

  constructor() {
    super();
    this.state = {
      open: false,
      selectedTap: null,
      beer: '',
      slack: true,
      error: null
    };
    _.bindAll(this, 'open', 'close', 'onTapSelected', 'onBeerUpdate', 'onCheck', 'submit');

    this.startBeerSearch = _.debounce((text) => this.props.searchBeer(text), 250);
  }

  open() {
    this.setState({
      open: true
    });
  }

  close() {
    this.setState({
      open: false,
      selectedTap: null,
      beer: '',
      slack: true,
      error: null
    });
  }

  onTapSelected(rows) {
    if (rows.length) {
      this.setState({
        selectedTap: rows[0]
      });
    }
  }

  onBeerUpdate(text) {
    if (text !== '' && typeof text === 'string') this.startBeerSearch(text);
    this.setState({
      beer: text
    });
  }

  onCheck(event, isChecked) {
    this.setState({
      slack: isChecked
    });
  }

  validate() {
    if (this.state.selectedTap === null) {
      this.setState({
        error: 'Please select a tap.'
      });
      return false;
    } else if (this.state.beer === '') {
      this.setState({
        error: 'Please select a beer.'
      });
      return false;
    }
    return true;
  }

  submit() {
    if (this.validate()) {
      const location = this.taps[this.state.selectedTap].location;
      let beer;
      if (typeof this.state.beer === 'string') {
        beer = {name: this.state.beer, id: null};
      } else {
        beer = {name: this.state.beer.text, id: this.state.beer.value.props.id};
      }
      this.props.updateTap(location.building, location.room, location.handle, beer).then(() => {
        this.props.fetchTaps();
        if (beer.id) this.props.fetchBeer(beer.id);
      });
      this.close();
    }
  }

  renderTable() {
    this.taps = _.orderBy(this.props.taps, ['location.building', 'location.room', 'location.handle']);
    const rows = this.taps.map((tap, index) => {
      return (
        <TableRow key={index} selected={this.state.selectedTap === index} className={tap.kicked ? 'empty' : ''}>
          <TableRowColumn>{tap.beer ? tap.beer.name : 'Empty'}</TableRowColumn>
          <TableRowColumn>{tap.location.building}</TableRowColumn>
          <TableRowColumn>{tap.location.room}</TableRowColumn>
        </TableRow>
      );
    });

    return (
      <Table height="200px" onRowSelection={(rows) => this.onTapSelected(rows)}>
        <TableHeader adjustForCheckbox={true} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Current Beer</TableHeaderColumn>
            <TableHeaderColumn>Building</TableHeaderColumn>
            <TableHeaderColumn>Room</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={true} deselectOnClickaway={false}>
          {rows}
        </TableBody>
      </Table>
    );
  }

  mapSearchResultsToDatasource() {
    return this.props.searchResults.map((beer) => {
      return {
        text: beer.name,
        value: (
          <MenuItem
            primaryText={beer.name}
            secondaryText={_.first(beer.breweries) && _.first(beer.breweries).name}
            id={beer.id}
          />
        )
      };
    });
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
          dataSource={this.mapSearchResultsToDatasource()}
          maxSearchResults={5}
          filter={(text) => text !== ''}
          onUpdateInput={this.onBeerUpdate}
          onNewRequest={this.onBeerUpdate}
          floatingLabelText="New Beer"
          fullWidth={true}
        />
        <div className="spacer" />
        <Checkbox
          label="Send Slack Notification"
          checked={this.state.slack}
          onCheck={this.onCheck}
        />
        <div className="spacer" />
        <span className="error-text">{this.state.error}</span>
      </Dialog>
    );
  }
}

export default ReplaceBeerModal;
