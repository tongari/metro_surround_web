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

const rootReducer = combineReducers({
  apiData,
});

export default rootReducer;
