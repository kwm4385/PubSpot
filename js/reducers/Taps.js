import * as ActionTypes from '../constants/ActionTypes';

let defaultState = [];

export default function(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.TAPS_FETCHED:
      return action.data;
    default:
      return state;
  }
}
