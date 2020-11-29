import action from "../action";
import { AuthActionType, LoginActionPayloadIF } from "../types/auth";
import axioz from "app/axios";
import constants from "app/constants";

export const login = (user: LoginActionPayloadIF) : AuthActionType => {
    return {
        type: action.auth.logout,
        payload: user
    }
}

export const logout = () : AuthActionType => {
    return {
        type: action.auth.logout
    }
}

export const setToken = (token : string) => {
    axioz.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem("spotyToken", token);
    return {
        type: 'SET_TOKEN',
        token
      };
}

export const logInWithSpotify = () => {
    let scope: String = [
        "user-read-private",
        "user-read-email",
        "streaming",
        "user-library-read",
        "user-library-modify",
        "user-follow-modify",
        "user-follow-read",
        "playlist-modify-public",
        "playlist-modify-private",
        "playlist-read-private",
        "playlist-read-collaborative",
        "app-remote-control",
        "user-read-recently-played",
        "user-top-read",
        "user-read-playback-position"
    ].join(' ');

    let requestURL: Array<String> = [
        constants.SPOTIFY_AUTH_URL_BASE,
        `?client_id=${process.env.CLIENT_ID}`,
        `&redirect_uri=http://localhost:9001/`,
        `&scope=${scope}`,
        '&response_type=token',
        '&show_dialog=true'
    ];
    let request: string = encodeURI(requestURL.join(''))
    window.location.href = request;
 }  
// http://localhost:9001/#access_token=BQDh_vTT34ppEKrI2iDXhyhT6XBNsVpJoF_k8DnrjtmaZOY9xZQAS6ZMOswq5YkSVUzZF5-nPS1FthDiGnnapYKEq5HodJOFY_whb2ikn1VNUrbk1ZHsnyBn8z1VX0vyogPQWZVpjJaGQct4o8Yn3zyXjiTTeB0qO_ROv1m0AzmW0yBsI4OrnA2_y8scjcubvgL2JHKSK2vpDBfAQPUTGgj7x_1tVV13M3pofJnT2uk9dh6oXbAJYKQco17cv-cJkNFNdIitHesYzvdTbvLnw5muqZa0xJXr&token_type=Bearer&expires_in=3600
 export const getToken = () => {
    let hashParams: {[key: string] : any} = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    window.location.hash = '';
    return hashParams.access_token;
  }

  export const fetchUser = () => {
    return async (dispatch: (arg0: any) => void) => {
      try {
        const response = await axioz.get('/me');
        alert(JSON.stringify(response.data));
        dispatch(logout());
        return response.data;
      } catch (error) {
        // dispatch(fetchUserError());
        dispatch(logout());
        return error;
      }
    };
  };

