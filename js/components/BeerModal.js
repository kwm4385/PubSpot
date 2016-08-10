import React, {Component} from 'react';
import { Dialog, FlatButton, Avatar, IconButton, FontIcon } from 'material-ui';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { List, ListItem } from 'material-ui/List';
import classNames from 'classNames';

export default class BeerModal extends Component {

  constructor() {
    super();
    this.state = {
      open: false,
      breweryOpen: false,
      styleOpen: false
    };
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

  renderTable(brewery) {
    const location = brewery && brewery.locations && _.first(brewery.locations);

    return (
      <Table>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>ABV</TableHeaderColumn>
            <TableHeaderColumn>IBU</TableHeaderColumn>
            <TableHeaderColumn>Origin</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          <TableRow>
            <TableRowColumn>{this.props.data.abv}%</TableRowColumn>
            <TableRowColumn>{this.props.data.ibu ? this.props.data.ibu : '-'}</TableRowColumn>
            <TableRowColumn>{location ? `${location.locality}, ${location.region}` : '-'}</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  renderInfo() {
    const brewery = this.props.data.breweries && _.first(this.props.data.breweries);

    const breweryDesc = brewery && (
      <div className={classNames({'slidein info-text': true, 'slidein-open': this.state.breweryOpen, 'slidein-closed': !this.state.breweryOpen})}>
        <IconButton tooltip="Back" style={{display: 'block'}} onClick={() => this.setState({breweryOpen: false})}>
          <FontIcon className="material-icons">keyboard_arrow_left</FontIcon>
        </IconButton>
        <strong>{brewery.name}</strong>
        <p>{brewery.description}</p>
        {brewery.website && <a href={brewery.website} target="blank">Website</a>}
      </div>
    );

    const styleDesc = brewery && (
      <div className={classNames({'slidein info-text': true, 'slidein-open': this.state.styleOpen, 'slidein-closed': !this.state.styleOpen})}>
        <IconButton tooltip="Back" style={{display: 'block'}} onClick={() => this.setState({styleOpen: false})}>
          <FontIcon className="material-icons">keyboard_arrow_left</FontIcon>
        </IconButton>
        <strong>{this.props.data.style.name}</strong>
        <p>{this.props.data.style.description}</p>
      </div>
    );

    return (
      <div>
        <Card>
          <CardHeader
            title={this.props.data.nameDisplay}
            subtitle={this.props.data.breweries && _.first(this.props.data.breweries).name}
            avatar={this.props.data.labels && this.props.data.labels.icon}
          />
          <CardText>
            {this.props.data.description && <span className="header-text">{this.props.data.description}</span>}
            {this.renderTable(brewery)}
            <List className="tight">
              <ListItem
                primaryText={this.props.data.style.name}
                secondaryText={this.props.data.style.description}
                onTouchTap={() => this.setState({styleOpen: true})}
              />
              <ListItem
                primaryText={brewery.name}
                secondaryText={brewery.description}
                leftAvatar={brewery.images && <Avatar src={brewery.images.icon} />}
                onTouchTap={() => this.setState({breweryOpen: true})}
              />
            </List>
          </CardText>
        </Card>
        <div className="slidein-container">
          {styleDesc}
          {breweryDesc}
        </div>
      </div>
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
          bodyStyle={{padding: 0, overflowX: 'hidden'}}
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
