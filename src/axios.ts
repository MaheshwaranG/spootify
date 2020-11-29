import axios from "axios";
import constants from "./constants";

const path:string =constants.SPOTIFY_WEB_API;

const instance = axios.create({
    baseURL: path,
    headers: {}
})

export default instance;