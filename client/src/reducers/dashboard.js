import { AUTH_SIGN_UP, AUTH_SIGN_IN, AUTH_SIGN_OUT, AUTH_ERROR, DASHBOARD_GET_DATA } from '../actions/types';

const DEFAULT_STATE = {
    isAuthenticated: false,
    token: '',
    errorMessage: ''
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case DASHBOARD_GET_DATA:
            console.log('[AuthReducer] got an AUTH_SIGN_UP action!');
            return { ...state, secret: action.payload}
        default:
            return state
    }
}