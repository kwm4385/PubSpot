import { TAPS_FETCHED } from '../constants/ActionTypes';
import fetch from 'whatwg-fetch';

export function getTaps() {
  return function(dispatch) {
    return fetch('/add_todo').then((response) => {

    });
  }
}
