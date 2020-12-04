import { LoginActionPayloadIF, UserStateIF } from "../types/auth";
import { login, logout } from "./auth";
import axioz from "app/axios";
import constants from "app/constants";
import action from "../action";
import { SetTokenActionPayloadIF } from "../types/auth";

export const fetchUser = () => {
  return async (dispatch: (arg0: any) => void) => {
    try {
      const response: any = await axioz.get("/me");
      const userData: any = response.data;
      const user: UserStateIF = {
        email: userData.email,
        userId: userData.id,
        userName: userData.display_name,
        images: userData.images,
      };
      const payload: LoginActionPayloadIF = {
        country: userData.country,
        user: user,
      };
      dispatch(login(payload));
      return response.data;
    } catch (error) {
      dispatch(logout());
      return error;
    }
  };
};

export const setAccessToken = (accessToken: string) => {
  axioz.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  localStorage.setItem(constants.ACCESS_TOKEN_NAME, accessToken);
  let payload: SetTokenActionPayloadIF = {
    accessToken: accessToken,
  };
  return {
    type: action.auth.setToken,
    payload,
  };
};
