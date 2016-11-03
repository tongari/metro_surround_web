import { combineReducers } from 'redux';
import * as actions from '../actions/index';

const apiData = (state = {}, action) => {
  switch (action.type) {
    case actions.API_SUCCESS:
      return action.value;
    case actions.API_FAIL:
      return 'fail';
    default:
      return state;
  }
};

const railwayId = (state_ = { prev: 0, current: 0 }, action) => {
  let state = state_;
  switch (action.type) {
    case actions.CHANGE_RAILWAY_ID: {
      state = Object.assign({}, state, {
        prev: state.current,
        current: action.id,
      });
    }
      break;
    default: {
      break;
    }
  }
  return state;
};

const rootReducer = combineReducers({
  apiData,
  railwayId,
});

export default rootReducer;
