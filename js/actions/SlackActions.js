import { BEER_FETCHED, BEER_SEARCHED } from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';

export function sendMessage(location, beer) {
  return function(dispatch) {
    return fetch(`/send-slack`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({location, beer})
    }
  )
  }
}
