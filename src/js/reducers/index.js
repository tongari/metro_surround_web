import { combineReducers } from 'redux';
import * as actions from '../actions/index';

const railwayApiData = (state = {}, action) => {
  switch (action.type) {
    case actions.API_SUCCESS: {
      const result = Object.assign({}, state, {
        data: action.value,
      });
      return result;
    }
    case actions.API_FAIL: {
      const result = Object.assign({}, state, {
        data: action.value,
      });
      return result;
    }
    default: {
      return state;
    }
  }
};

const railwayId = (state = { prev: 0, current: 0 }, action) => {
  switch (action.type) {
    case actions.CHANGE_RAILWAY_ID: {
      const result = Object.assign({}, state, {
        prev: state.current,
        current: action.id,
      });
      return result;
    }
    default: {
      return state;
    }
  }
};

const railwayDetail = (state = { isShow: false }, action) => {
  switch (action.type) {
    case actions.GO_TRANSIT_RAILWAY_DETAIL: {
      const result = Object.assign({}, state, {
        isShow: true,
      });
      return result;
    }
    default: {
      return state;
    }
  }
};

const rootReducer = combineReducers({
  railwayApiData,
  railwayId,
  railwayDetail,
});

export default rootReducer;
