import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as TapsActions from '../actions/TapsActions';
import { Menu, MenuItem } from 'semantic-react';

class Home extends Component {

  componentWillMount() {
    this.props.fetchTaps();
  }

  render() {
    console.log(this.props.taps);
    return (
      <main>
        <Menu>
          <MenuItem>First item</MenuItem>
          <MenuItem>Second Item</MenuItem>
        </Menu>
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
