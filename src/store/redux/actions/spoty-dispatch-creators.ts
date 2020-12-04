import {
  DoSearchActionPayloadIF,
  LastWeekRelaseActionPayloadIF,
} from "../types/spoty";
import axioz from "app/axios";
import constants from "app/constants";
import { FeatureListActionPayloadIF } from "../types/spoty";
import { login, logout } from "./auth";
import { doSearch, getFeatureList, getLastWeekReleasedSongs } from "./spoty";
import { off } from "process";

export const getFeatureListCall = () => {
  return async (dispatch: (arg: any) => any) => {
    try {
      const response: any = await axioz.get(
        "/browse/featured-playlists?country=IN&limit=40"
      );
      const list: FeatureListActionPayloadIF = {
        list: response.data.playlists.items,
        total: response.data.playlists.total,
      };
      dispatch(getFeatureList(list));
    } catch (exception: any) {
      dispatch(logout());
    }
  };
};

export const getLastWeekReleasedSongsCall = (offset?: number) => {
  return async (dispatch: (arg: any) => any) => {
    try {
      let endpoint: string = "/browse/new-releases?country=IN&limit=40";
      if (!!offset) {
        endpoint += `&offset=${offset}`;
      }
      const response: any = await axioz.get(endpoint);
      const list: LastWeekRelaseActionPayloadIF = {
        list: response.data.albums.items,
        total: response.data.albums.total,
      };
      dispatch(getLastWeekReleasedSongs(list));
    } catch (exception: any) {
      dispatch(logout());
    }
  };
};

export const doSearchCall = (searchText: string) => {
  return async (dispatch: (arg: any) => any) => {
    try {
      const query = encodeURI(
        [
          `/search`,
          `?q="${searchText}"`,
          `&type=album,playlist`,
          `&limit=20`,
        ].join("")
      );
      const response = await axioz.get(query.toString());
      const responseData = response.data;
      const data: DoSearchActionPayloadIF = {
        albums: responseData.albums.items,
        playlist: responseData.playlists.items,
      };
      dispatch(doSearch(data));
    } catch (e) {
      dispatch(logout());
    }
  };
};
