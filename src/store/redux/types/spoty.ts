import action from "../action";
import { ActionIF } from "./action";
import { SpotyAlbumIF, SpotyPlaylistIF, SpotyImageIF } from "./spoty-api";

export enum ActiveTypeEnum {
  search = "search",
  new = "new",
  featured = "featured",
}

export interface SpotyAppDataIF {
  active: ActiveTypeEnum;
  searchText: string;
  featureList: SpotyDataList[];
  lastWeekSongs: SpotyDataList[];
  searchResult: SpotyAppSearchResultIF;
  paging: SpotyPagingIF;
}

export interface SpotyAppSearchResultIF {
  albums: SpotyDataList[];
  playlist: SpotyDataList[];
}

export interface SpotyPagingIF {
  limit: number;
  offset: number;
  total: number;
}

export interface SpotyDataList {
  images: SpotyImageIF | undefined;
  name: string;
  message: string;
  id: string;
  url: string;
}

export interface SetActiveActionPayloadIF {
  active: ActiveTypeEnum;
  searchText: string;
}

export interface SetActiveActionIF extends ActionIF {
  payload: SetActiveActionPayloadIF;
}

export interface FeatureListActionPayloadIF {
  list: SpotyPlaylistIF[];
  total: number;
}

export interface FeatureListActionIF extends ActionIF {
  payload: FeatureListActionPayloadIF;
}

export interface LastWeekRelaseActionPayloadIF {
  list: SpotyAlbumIF[];
  total: number;
}

export interface LastWeekRelaseActionIF extends ActionIF {
  payload: LastWeekRelaseActionPayloadIF;
}

export interface DoSearchActionPayloadIF {
  albums: SpotyAlbumIF[];
  playlist: SpotyPlaylistIF[];
}

export interface DoSearchActionIF extends ActionIF {
  payload: DoSearchActionPayloadIF;
}

export type SpotyActionType =
  | FeatureListActionIF
  | LastWeekRelaseActionIF
  | DoSearchActionIF
  | SetActiveActionIF;
