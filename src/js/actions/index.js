export const API_SUCCESS = Symbol('apiSuccess');
export const API_FAIL = Symbol('apiFail');
export const CHANGE_RAILWAY_ID = Symbol('changeRailwayId');
export const GO_TRANSIT_RAILWAY_DETAIL = Symbol('changeTransitRailwayDetail');

export const onFetchApiSuccess = value => ({ type: API_SUCCESS, value });
export const onFetchApiFail = () => ({ type: API_FAIL, value: 'FAIL' });
export const onChangeRailwayId = id => ({ type: CHANGE_RAILWAY_ID, id });
export const onGoTransitRailwayDetail = () => ({ type: GO_TRANSIT_RAILWAY_DETAIL });

