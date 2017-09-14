import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as TapsActions from '../actions/TapsActions';
import * as BeerActions from '../actions/BeerActions';
import * as SlackActions from '../actions/SlackActions';
import { AppBar, FlatButton } from 'material-ui';
import Location from './Location';
import ReplaceBeerModal from './ReplaceBeerModal';
import ReplaceSingleBeerModal from './ReplaceSingleBeerModal';
import _ from 'lodash';

class Home extends Component {

  componentWillMount() {
    this.props.fetchTaps();
  }

  renderLocations() {
    return _.orderBy(_.uniqBy(this.props.taps, (t) => t.location.room), ['location.building', 'location.room']).map((tap, index) => {
      let taps = _.filter(this.props.taps, (t) => {
        return t.location.room === tap.location.room;
      });
      return (
        <Location
          key={index}
          building={tap.location.building}
          room={tap.location.room}
          taps={taps}
        />
      );
    });
  }

  render() {
    return (
      <main>
        <AppBar
          title={<span>PubSp<img src="/img/beer.png" />t <small>Beta</small></span>}
          className="nav"
          iconElementLeft={<span></span>}
          iconElementRight={<FlatButton label="New Beer" onClick={() => this.refs.replaceBeerModal.open()} />}
        />
        <div className="container">
          {this.renderLocations()}
        </div>
        <ReplaceSingleBeerModal/>
        <ReplaceBeerModal
          ref="replaceBeerModal"
          taps={this.props.taps}
          searchResults={this.props.searchResults}
          searchBeer={this.props.searchBeer}
          updateTap={this.props.updateTap}
          fetchTaps={this.props.fetchTaps}
          fetchBeer={this.props.fetchBeer}
          sendSlack={this.props.sendSlack}
        />
        <footer>
          Visit PubSpot on <a href="https://github.com/kwm4385/PubSpot" target="blank">GitHub</a>
        </footer>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    taps: state.taps,
    searchResults: state.searchResults
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTaps: () => dispatch(TapsActions.fetchTaps()),
    searchBeer: (query) => dispatch(BeerActions.searchBeer(query)),
    updateTap: (building, room, handle, beer) => dispatch(TapsActions.updateTap(building, room, handle, beer)),
    fetchBeer: (id) => dispatch(BeerActions.fetchBeer(id)),
    sendSlack: (location, beer) => dispatch(SlackActions.sendMessage(location, beer))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
