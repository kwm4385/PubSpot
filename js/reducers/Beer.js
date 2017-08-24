import * as ActionTypes from '../constants/ActionTypes';

let defaultState = {shouldModalBeOpen:false};

export default function(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.BEER_FETCHED:
      let newState = {...state};
      newState[action.id] = action.data.data;
      return newState;
      console.log(action.activeLocation)
      return {...state,shouldModalBeOpen:!state.shouldModalBeOpen,activeLocation:action.activeLocation}
    default:
      return state;
  }
}
