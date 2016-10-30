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

const getRailwayId = (state = 0, action) => {
  switch (action.type) {
    case actions.CHANGE_RAILWAY_ID:
      return action.id;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  apiData,
  getRailwayId,
});

export default rootReducer;
