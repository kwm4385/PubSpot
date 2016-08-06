import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as TapsActions from '../actions/TapsActions';
import { AppBar } from 'material-ui';
import Location from './Location';
import _ from 'lodash';

class Home extends Component {

  componentWillMount() {
    this.props.fetchTaps();
  }

  renderLocations() {
    return _.uniqBy(this.props.taps, (t) => t.location.room).map((tap, index) => {
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
          title={<span>PubSp<img src="/img/beer.png" />t</span>}
          className="nav"
          iconElementLeft={<span></span>}
        />
        <div className="container">
          {this.renderLocations()}
        </div>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    taps: state.taps
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTaps: () => dispatch(TapsActions.fetchTaps())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
