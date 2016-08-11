import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classNames';
import * as BeerActions from '../actions/BeerActions';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import randomColor from 'randomColor';
import BeerModal from './BeerModal';

class Tap extends Component {

  componentWillMount() {
    if (this.props.data.beer) {
      this.props.fetchBeer(this.props.data.beer.id);
    }
  }

  renderBeer() {
    let beer = this.props.beer;
    if (beer) {
      return (
        <ul className="beer-info">
          {beer.breweries.length && <li>{_.first(beer.breweries).name}</li>}
          {beer.style && <li>{beer.style.shortName}</li>}
          {beer.abv && <li>{beer.abv}%</li>}
          <li><BeerModal data={beer} /></li>
        </ul>
      );
    }
  }

  renderInfo() {
    if (this.props.data.beer) {
      return (
        <div className={classNames({'tap-info': true, 'empty': this.props.data.kicked})}>
          <h2>{this.props.data.beer.name}</h2>
          {this.renderBeer()}
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
    return (
      <div className="tap box">
        <div className="handle-container">
          {this.props.data.beer && <div className="handle-text" style={{color: randomColor()}}>{this.props.data.beer.name}</div>}
          <img className="tap-img" src={`img/combo${this.props.data.kicked ? '_kicked' : ''}.png`} />
        </div>
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
    fetchBeer: (id) => dispatch(BeerActions.fetchBeer(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tap);
