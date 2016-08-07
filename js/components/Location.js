import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Tap from './Tap';

export default class Location extends Component {

  renderTaps() {
    return this.props.taps.map((tap, index) => {
      return (
        <div key={index} className="col-xs">
          <Tap data={tap} />
        </div>
      );
    });
  }

  render() {
    return (
      <Card className="location">
        <CardHeader
          title={this.props.building}
          subtitle={this.props.room}
          avatar="/img/hs.jpg"
        />
        <CardText className="taps">
          <div className="row">
            {this.renderTaps()}
          </div>
        </CardText>
      </Card>
    );
  }
}
