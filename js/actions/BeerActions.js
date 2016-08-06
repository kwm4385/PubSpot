import { BEER_FETCHED } from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';

export function fetchBeer(id) {
  return function(dispatch) {
    return fetch(`/get-beer/${id}`).then((response) => response.json().then((json) => {
      dispatch({
        type: BEER_FETCHED,
        data: json,
        id
      });
    }));
  }
}
