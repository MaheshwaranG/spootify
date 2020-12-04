import action from "../action";
import { AuthActionType, LoginActionPayloadIF } from "../types/auth";
import axioz from "app/axios";
import constants from "app/constants";
export const login = (user: LoginActionPayloadIF): AuthActionType => {
  return {
    type: action.auth.login,
    payload: user,
  };
};

export const logout = (): AuthActionType => {
  axioz.defaults.headers.common["Authorization"] = `Bearer `;
  localStorage.removeItem(constants.ACCESS_TOKEN_NAME);
  return {
    type: action.auth.logout,
  };
};
