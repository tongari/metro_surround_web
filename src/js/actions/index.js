export const API_SUCCESS = Symbol('api success');
export const API_FAIL = Symbol('api fail');

export const fetchApiSuccess = value => ({ type: API_SUCCESS, value });
export const fetchApiFail = () => ({ type: API_FAIL });
