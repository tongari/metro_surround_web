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

const carComposition = (state = { isShow: false }, action) => {
  switch (action.type) {
    case actions.GO_TRANSIT_CAR_COMPOSITION: {
      const result = Object.assign({}, state, {
        isShow: true,
      });
      return result;
    }
    case actions.GO_TRANSIT_RAILWAY: {
      const result = Object.assign({}, state, {
        isShow: false,
      });
      return result;
    }
    default: {
      return state;
    }
  }
};

const loader = (state = { isLoading: false }, action) => {
  switch (action.type) {
    case actions.START_LOADING: {
      const result = Object.assign({}, state, {
        isLoading: true,
      });
      return result;
    }
    case actions.END_LOADING: {
      const result = Object.assign({}, state, {
        isLoading: false,
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
  carComposition,
  loader,
});

export default rootReducer;
