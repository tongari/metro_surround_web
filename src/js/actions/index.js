export const API_SUCCESS = Symbol('apiSuccess');
export const API_FAIL = Symbol('apiFail');
export const CHANGE_RAILWAY_ID = Symbol('changeRailwayId');
export const GO_TRANSIT_RAILWAY = Symbol('goTransitRailway');
export const START_LOADING = Symbol('startLoading');
export const END_LOADING = Symbol('endLoading');
export const DRAG_MOVE = Symbol('dragMove');
export const DRAG_END = Symbol('dragEnd');
export const ON_RESIZE = Symbol('onResize');
export const CHANGE_NEAR_STATION_LIST = Symbol('changeNearStationList');
export const SHOW_NEAR_STATION_LIST = Symbol('showNearStationList');
export const HIDE_NEAR_STATION_LIST = Symbol('hideNearStationList');
export const SHOW_NEAR_STATION = Symbol('showNearStation');
export const HIDE_NEAR_STATION = Symbol('hideNearStation');

export const onFetchApiSuccess = value => ({ type: API_SUCCESS, value });
export const onFetchApiFail = () => ({ type: API_FAIL, value: 'FAIL' });
export const onChangeRailwayId = id => ({ type: CHANGE_RAILWAY_ID, id });
export const onGoTransitRailway = () => ({ type: GO_TRANSIT_RAILWAY });
export const onStartLoader = () => ({ type: START_LOADING });
export const onEndLoader = () => ({ type: END_LOADING });
export const onDragMove = () => ({ type: DRAG_MOVE });
export const onDragEnd = () => ({ type: DRAG_END });
export const onResize = value => ({ type: ON_RESIZE, value });
export const onChangeNearStationList = value => ({ type: CHANGE_NEAR_STATION_LIST, value });
export const showNearStationList = () => ({ type: SHOW_NEAR_STATION_LIST });
export const hideNearStationList = () => ({ type: HIDE_NEAR_STATION_LIST });
export const showNearStation = value => ({ type: SHOW_NEAR_STATION, value });
export const hideNearStation = () => ({ type: HIDE_NEAR_STATION });

