import * as ActionTypes from '../constants/ActionTypes';

let defaultState = [];

export default function(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.BEER_SEARCHED:
      return action.data;
    default:
      return state;
  }
}
