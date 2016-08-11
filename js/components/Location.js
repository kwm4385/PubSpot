import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Tap from './Tap';

export default class Location extends Component {

  renderTaps() {
    return _.orderBy(this.props.taps, ['location.handle']).map((tap, index) => {
      return (
        <div key={index} className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
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
