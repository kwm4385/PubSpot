import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Dialog, FlatButton, AutoComplete, Checkbox, MenuItem } from 'material-ui';
import * as TapsActions from '../actions/TapsActions';
import * as BeerActions from '../actions/BeerActions';


class ReplaceSingleBeerModal extends Component {
  constructor(){
    super();
    this.state = {
      open:false,
      slack: false
    };
    _.bindAll(this, 'close', 'mapSearchResultsToDatasource', 'onBeerUpdate', 'submit', 'shouldModalBeOpen', 'onCheck');

    this.startBeerSearch = _.debounce((text) => this.props.searchBeer(text), 250);
  }

  onCheck(event, isChecked) {
    this.setState({
      slack: isChecked
    });
  }

  close() {
    this.props.modalOpenClose()
  }

  onBeerUpdate(text) {
    if (text !== '' && typeof text === 'string') this.startBeerSearch(text);
    this.setState({
      beer: text
    });
  }

  submit() {
      const location = this.props.activeLocation ? JSON.parse(this.props.activeLocation) : undefined
      let beer;
      if (typeof this.state.beer === 'string') {
        beer = {name: this.state.beer, id: null};
      } else {
        beer = {name: this.state.beer.text, id: this.state.beer.value.props.id};
      }
      const slack = this.state.slack;
      this.props.updateTap(location.building, location.room, location.handle, beer).then(() => {
          this.props.setKicked(location.building, location.room, location.handle, false).then(() => {
            this.props.fetchTaps();
            if (beer.id) {
              this.props.fetchBeer(beer.id).then(() => {
                if (slack) this.props.sendSlack(location, beer.name)
                this.close();
              });
            } else {
              if (slack) this.props.sendSlack(location, beer.name)
              this.close();
            }
          });
      });
  }

  shouldModalBeOpen(){
    if(this.props.activeLocation){
      return true
    }
    else{
      return false
    }
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

  render(){
    
  const location = this.props.activeLocation ? JSON.parse(this.props.activeLocation) : undefined
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
    // return !this.props.activeLocation ? null :
    // 
    return (
    <Dialog
        actions={actions}
        modal={false}
        open={this.shouldModalBeOpen()}
        autoScrollBodyContent={true}
        onRequestClose={() => this.close()}
      >
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
      </Dialog>)
  }
}

function mapStateToProps(state, ownProps) {
  return {
    searchResults: state.searchResults,
    shouldModalBeOpen: state.beer.shouldModalBeOpen,
    activeLocation: state.beer.activeLocation,
  } 
}

function mapDispatchToProps(dispatch){
  return {
    searchBeer: (query) => dispatch(BeerActions.searchBeer(query)),
    fetchTaps: () => dispatch(TapsActions.fetchTaps()),
    fetchBeer: (id) => dispatch(BeerActions.fetchBeer(id)),
    updateTap: (building, room, handle, beer) => dispatch(TapsActions.updateTap(building, room, handle, beer)),
    modalOpenClose: (activeLocation) => dispatch(BeerActions.modalOpenClose(activeLocation)),
    setKicked: (building, room, handle, kicked) => dispatch(TapsActions.setKicked(building, room, handle, kicked)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ReplaceSingleBeerModal);