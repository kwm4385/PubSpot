import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as TapsActions from '../actions/TapsActions';
import { AppBar } from 'material-ui';
import styles from '../../css/app.css';

class Home extends Component {

  componentWillMount() {
    this.props.fetchTaps();
  }

  render() {
    return (
      <main>
        <AppBar
          title="PubSpot"
          className={styles.nav}
          iconElementLeft={<span></span>}
        />
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
