import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classNames';
import * as BeerActions from '../actions/BeerActions';
import * as TapsActions from '../actions/TapsActions';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import randomColor from 'randomColor';
import BeerModal from './BeerModal';
import ConfirmationDialog from './ConfirmationDialog';

class Tap extends Component {

  componentWillMount() {
    if (this.props.data.beer) {
      this.props.fetchBeer(this.props.data.beer.id);
    }
  }

  onHandleClick() {
    this.refs.confirm.open(() => {
      const location = this.props.data.location;
      this.props.setKicked(location.building, location.room, location.handle, !this.props.data.kicked).then(() => {
        this.props.fetchTaps();
      });
    });
  }

  renderBeer() {
    let beer = this.props.beer;
    const lastUpdated = this.props.data.updated ? humanTimeSince(this.props.data.updated) : "unknown";
    if (beer) {
      return (
        <ul className="beer-info">
          {beer.breweries.length && <li>{_.first(beer.breweries).name}</li>}
          {beer.style && <li>{beer.style.shortName}</li>}
          {beer.abv && <li>{beer.abv}%</li>}
          <li>{lastUpdated}</li>
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
        <ConfirmationDialog ref="confirm">
          Are you sure you want to {this.props.data.kicked ? 'unkick' : 'kick'} this beer?
        </ConfirmationDialog>
        <div className="handle-container">
          <a className="handle" onClick={() => this.onHandleClick()}>
            {this.props.data.beer && <div className="handle-text" style={{color: randomColor()}}>{this.props.data.beer.name}</div>}
            <img className="tap-img" src={`img/combo${this.props.data.kicked ? '_kicked' : ''}.png`} />
          </a>
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
    fetchBeer: (id) => dispatch(BeerActions.fetchBeer(id)),
    fetchTaps: () => dispatch(TapsActions.fetchTaps()),
    setKicked: (building, room, handle, kicked) => dispatch(TapsActions.setKicked(building, room, handle, kicked))
  };
}

function humanTimeSince(timeStamp) {
  const secondsPast = ((new Date()).getTime() - (new Date(timeStamp)).getTime()) / 1000;
  if (secondsPast < 60) {
    return "Just now!";
  }
  if (secondsPast < 3600) {
    const minutes = parseInt(secondsPast / 60);
    return  `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }
  if (secondsPast < 86400) {
    const hours = parseInt(secondsPast / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  if (secondsPast <= 2592000) {
    const days = parseInt(secondsPast / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
  if (secondsPast > 2592000){
    return timeStamp.toISOString().slice(0, 10);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tap);
