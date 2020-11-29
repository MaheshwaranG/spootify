import actionTypes from "../action";
import {UserStateIF, SystemStateIF, AuthActionType, LoginActionPayloadIF} from "../types/auth";

const initialState : SystemStateIF = {
    loggedIn: false,
    accessToken: undefined,
    locale: 'en-IN',
    timezone: '5.5',
    user: undefined
}

const auth = (state = initialState, action: AuthActionType) => {
    switch(action.type) {
        case actionTypes.auth.login: 
            const payload : LoginActionPayloadIF = action.payload;
            return {
                ...state,
                loggedIn: true,
                user :  payload.user
            }
        case actionTypes.auth.logout:
            return {
                loggedIn : false,
                accessToken: undefined,
                locale: 'en-IN',
                timezone: '5.5',
                user: undefined
            }
        default:
            return state;
    }
}

export default auth;