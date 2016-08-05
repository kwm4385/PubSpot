import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as TapsActions from '../actions/TapsActions';
import styles from '../../css/app.css';

class Home extends Component {

  componentWillMount() {
    this.props.fetchTaps();
  }

  render() {
    console.log(this.props.taps);
    return (
      <main>

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
