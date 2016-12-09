import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
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

const dragState = (state = { isDrag: false }, action) => {
  switch (action.type) {
    case actions.DRAG_MOVE: {
      const result = Object.assign({}, state, {
        isDrag: true,
      });
      return result;
    }
    case actions.DRAG_END: {
      const result = Object.assign({}, state, {
        isDrag: false,
      });
      return result;
    }
    default: {
      return state;
    }
  }
};

const screenSize = (state = { width: 0, height: 0 }, action) => {
  switch (action.type) {
    case actions.ON_RESIZE: {
      const result = Object.assign({}, state, {
        width: action.value.width,
        height: action.value.height,
      });
      return result;
    }
    default: {
      return state;
    }
  }
};

const nearStationList = (state = {}, action) => {
  switch (action.type) {
    case actions.CHANGE_NEAR_STATION_LIST: {
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

const rootReducer = combineReducers({
  railwayApiData,
  railwayId,
  loader,
  dragState,
  screenSize,
  nearStationList,
  routing: routerReducer,
});

export default rootReducer;
