import { TAPS_FETCHED } from '../constants/ActionTypes';
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
