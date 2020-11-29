import action from "../action";
import {ActionIF} from "./action"
export interface SystemStateIF {
    loggedIn: boolean;
    accessToken: string | undefined;
    locale ?: string | undefined,
    timezone ?: string | undefined,
    user :  UserStateIF | undefined
}

export interface UserStateIF {
    userName: string,
    email: string,
    userId: string
}

export interface LoginActionPayloadIF {
    accessToken: string ;
    locale ?: string | undefined,
    timezone ?: string | undefined,
    user :  UserStateIF
}

export interface LoginActionIF extends ActionIF{
    payload: LoginActionPayloadIF;
}

export interface LogoutActionIF extends ActionIF{
} 

export type AuthActionType = LoginActionIF | LogoutActionIF;



