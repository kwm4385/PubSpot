import { TAPS_FETCHED, TAP_UPDATED, TAP_KICKED } from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';

export function fetchTaps() {
  return function(dispatch) {
    return fetch('/taps').then((response) => response.json().then((json) => {
      dispatch({
        type: TAPS_FETCHED,
        data: json
      });
    }));
  }
}

export function updateTap(building, room, handle, beer) {
  return function(dispatch) {
    return fetch(`/replace-beer/${building}/${room}/${handle}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(beer)
    }
  ).then((response) => {
    dispatch({
      type: TAP_UPDATED,
      data: response
    });
  });
  }
}

export function setKicked(building, room, handle, kicked) {
  return function(dispatch) {
    return fetch(`/set-kicked/${building}/${room}/${handle}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({kicked})
    }
  ).then((response) => {
    dispatch({
      type: TAP_KICKED,
      data: kicked,
      location: {building, room, handle}
    });
  });
  }
}
