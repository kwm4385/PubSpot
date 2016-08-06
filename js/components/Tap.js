import React, {Component} from 'react';
import {connect} from 'react-redux';
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
    console.log(beer);
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
        <div className="tap-info">
          <h2>{this.props.beer && this.props.beer.nameDisplay}</h2>
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
          {this.props.data.beer && <div className="handle-text" style={{color: randomColor({luminosity: 'light'})}}>{this.props.data.beer.name}</div>}
          <img className="tap-img" src='img/combo.png' />
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
