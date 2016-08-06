import * as ActionTypes from '../constants/ActionTypes';

let defaultState = {};

export default function(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.BEER_FETCHED:
      let newState = {...state};
      newState[action.id] = action.data.data;
      return newState;
    default:
      return state;
  }
}
