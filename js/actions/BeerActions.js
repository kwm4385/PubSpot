import { BEER_FETCHED, BEER_SEARCHED, OPEN_CLOSE_MODAL } from '../constants/ActionTypes';
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

export function searchBeer(query) {
  return function(dispatch) {
    return fetch(`/search-beer/${query}`).then((response) => response.json().then((json) => {
      dispatch({
        type: BEER_SEARCHED,
        data: json.data || []
      });
    }));
  }
}

export function modalOpenClose(activeLocation){
  return {
    type: OPEN_CLOSE_MODAL,
    activeLocation
  }
}
