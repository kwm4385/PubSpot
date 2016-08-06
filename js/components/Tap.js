import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class Tap extends Component {

  renderInfo() {
    if (this.props.data.beer) {
      return (
        <div className="tap-info">
          <h2>{this.props.data.beer.name}</h2>
        </div>
      );
    } else {
      return (
        <div className="tap-info empty">
          <h2>Empty :(</h2>
        </div>
      );
    }
  }

  render() {
    console.log(this.props.data.beer);
    return (
      <div className="tap box">
        <img className="tap-img" src='img/combo.png' />
        {this.renderInfo()}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  if (ownProps.data.beer) {
    return {
      beer: state.beer[ownProps.data.beer.id]
    };
  } else {
    return {
      beer: null
    };
  }
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tap);
