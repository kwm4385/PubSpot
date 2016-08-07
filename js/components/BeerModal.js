import React, {Component} from 'react';
import { Dialog, FlatButton, Avatar } from 'material-ui';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';

export default class BeerModal extends Component {

  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

  renderInfo() {
    const brewery = this.props.data.breweries && _.first(this.props.data.breweries);

    return (
      <Card>
        <CardHeader
          title={this.props.data.nameDisplay}
          subtitle={this.props.data.breweries && _.first(this.props.data.breweries).name}
          avatar={this.props.data.labels && this.props.data.labels.icon}
        />
        <CardText>
          {this.props.data.description && <span className="header-text">{this.props.data.description}</span>}
          <List className="tight">
            <ListItem
              primaryText={this.props.data.style.name}
              secondaryText={this.props.data.style.description}
            />
            <ListItem
              primaryText={brewery.name}
              secondaryText={brewery.description}
              leftAvatar={brewery.images && <Avatar src={brewery.images.icon} />}
            />
          </List>
        </CardText>
      </Card>
    );
  }

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={() => this.handleClose()}
      />,
    ];

    return (
      <div>
        <FlatButton label="More..." primary={true} onClick={() => this.handleOpen()} />
        <Dialog
          bodyStyle={{padding: 0, overflow: 'hidden'}}
          actions={actions}
          modal={false}
          open={this.state.open}
          autoScrollBodyContent={true}
          onRequestClose={() => this.handleClose()}
        >
          {this.renderInfo()}
        </Dialog>
      </div>
    );
  }
}
