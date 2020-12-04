import action from "../action";
import {ActionIF} from "./action"
export interface SystemStateIF {
    loggedIn: boolean;
    accessToken: string | undefined;
    country ?: string | undefined,
    timezone ?: string | undefined,
    user :  UserStateIF | undefined,
    stateChanged : boolean
}

export interface UserStateIF {
    userName: string,
    email: string,
    userId: string,
    images ?: Array<string>
}

export interface LoginActionPayloadIF {
    country ?: string | undefined,
    timezone ?: string | undefined,
    user :  UserStateIF
}

export interface SetTokenActionPayloadIF {
    accessToken: string ;
}

export interface LoginActionIF extends ActionIF{
    payload: LoginActionPayloadIF;
}

export interface LogoutActionIF extends ActionIF{
} 

export type AuthActionType = LoginActionIF | LogoutActionIF;



