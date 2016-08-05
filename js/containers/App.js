import React from 'react';
import {Provider} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as Colors from 'material-ui/styles/colors';
import configureStore from '../store/configureStore';
import Home from '../components/Home';

const store = configureStore();

const muiTheme = getMuiTheme({
  fontFamily: 'Montserrat, Roboto, sans-serif',
  palette: {
    primary1Color: '#f47621',
    primary2Color: Colors.orange800,
    primary3Color: Colors.lightBlack,
    accent1Color: Colors.pinkA200,
    accent2Color: Colors.grey100,
    accent3Color: Colors.grey500,
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    pickerHeaderColor: Colors.orange600
  },
  appBar: {
   backgroundColor: 'rgba(white, 0.3)'
  },
});

export default React.createClass({
  render() {
    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Provider store={store}>
            <Home />
          </Provider>
        </MuiThemeProvider>
      </div>
    );
  }
});
