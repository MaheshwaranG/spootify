import actionTypes from "../action";
import {UserStateIF, SystemStateIF, AuthActionType, LoginActionPayloadIF, SetTokenActionPayloadIF} from "../types/auth";

const initialState : SystemStateIF = {
    loggedIn: false,
    accessToken: undefined,
    country: 'IN',
    timezone: '5.5',
    user: undefined,
    stateChanged: false,
}

const auth = (state = initialState, action: AuthActionType) => {
    switch(action.type) {
        case actionTypes.auth.login: 
            return login(state, action.payload);
        case actionTypes.auth.logout:
           return logout(state, action.payload);
        case actionTypes.auth.setToken:
            return setToken(state, action.payload);
        default:
            return state;
    }
}

const login = (state: SystemStateIF, payload : LoginActionPayloadIF) : SystemStateIF => {
    return {
        ...state,
        loggedIn: true,
        user :  payload.user,
        stateChanged: !state.stateChanged
    }
}

const logout = (state: SystemStateIF, payload : any) : SystemStateIF => {
    return {
        loggedIn : false,
        accessToken: undefined,
        country: 'IN',
        timezone: '5.5',
        user: undefined,
        stateChanged: !state.stateChanged
    }
}

const setToken = (state: SystemStateIF, payload : SetTokenActionPayloadIF): SystemStateIF => {
    return {
        ...state,
        accessToken: payload.accessToken
    }
} 

export default auth;