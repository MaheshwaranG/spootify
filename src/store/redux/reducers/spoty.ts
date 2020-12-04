import actionTypes from "../action";
import moment from "moment";
import {
  SpotyAppDataIF,
  SpotyActionType,
  FeatureListActionPayloadIF,
  LastWeekRelaseActionPayloadIF,
  DoSearchActionPayloadIF,
  ActiveTypeEnum,
  SpotyDataList,
  SetActiveActionPayloadIF,
} from "../types/spoty";

import {
  spotyDataListFromSpotyAlbums,
  spotyDataListFromSpotyPlayList,
} from "../../../services/spoty/common";

const initialState: SpotyAppDataIF = {
  active: ActiveTypeEnum.featured,
  searchText: "",
  featureList: [],
  lastWeekSongs: [],
  searchResult: {
    albums: [],
    playlist: [],
  },
  paging: {
    limit: 20,
    offset: 0,
    total: 0,
  },
};

const spoty = (
  state: SpotyAppDataIF = initialState,
  action: SpotyActionType
): SpotyAppDataIF => {
  switch (action.type) {
    case actionTypes.spoty.setActive:
      return setActive(state, <SetActiveActionPayloadIF>action.payload);
    case actionTypes.spoty.getFeatureList:
      return getFeatureList(state, <FeatureListActionPayloadIF>action.payload);
    case actionTypes.spoty.getLastWeekRelase:
      return getLastWeekSongs(
        state,
        <LastWeekRelaseActionPayloadIF>action.payload
      );
    case actionTypes.spoty.dosearch:
      return doSearch(state, <DoSearchActionPayloadIF>action.payload);
    default:
      return state;
  }
};

const setActive = (
  state: SpotyAppDataIF,
  payload: SetActiveActionPayloadIF
): SpotyAppDataIF => {
  if (
    payload.active === ActiveTypeEnum.search &&
    !!payload.searchText.length &&
    payload.searchText != state.searchText
  ) {
    return {
      ...state,
      active: payload.active,
      searchText: payload.searchText,
      featureList: [],
      lastWeekSongs: [],
      searchResult: {
        albums: [],
        playlist: [],
      },
      paging: {
        limit: 20,
        offset: 0,
        total: 0,
      },
    };
  }
  if (payload.active !== state.active) {
    if (payload.active !== ActiveTypeEnum.search) {
      return {
        ...state,
        active: payload.active,
        searchText: "",
        paging: {
          limit: 20,
          offset: 0,
          total: 0,
        },
      };
    }
  }

  return state;
};

const getFeatureList = (
  state: SpotyAppDataIF,
  payload: FeatureListActionPayloadIF
): SpotyAppDataIF => {
  const list: SpotyDataList[] = spotyDataListFromSpotyPlayList(payload.list);
  console.log("Reducer getFeature: " + JSON.stringify(list));
  if (list.length > 0) {
    return {
      ...state,
      searchText: "",
      featureList: [...state.featureList, ...list],
      paging: {
        ...state.paging,
        offset: state.paging.offset + list.length,
        total: payload.total,
      },
    };
  } else {
    return state;
  }
};

const getLastWeekSongs = (
  state: SpotyAppDataIF,
  payload: LastWeekRelaseActionPayloadIF
): SpotyAppDataIF => {
  const list: SpotyDataList[] = spotyDataListFromSpotyAlbums(payload.list);
  console.log("Reducer getLatest Songs: " + JSON.stringify(list));
  if (list.length > 0) {
    return {
      ...state,
      lastWeekSongs: [...state.lastWeekSongs, ...list],
      paging: {
        ...state.paging,
        offset: state.paging.offset + list.length,
        total: payload.total,
      },
    };
  } else {
    return state;
  }
};

const doSearch = (state: SpotyAppDataIF, payload: DoSearchActionPayloadIF) => {
  const albums: SpotyDataList[] = spotyDataListFromSpotyAlbums(payload.albums);
  const playlist: SpotyDataList[] = spotyDataListFromSpotyPlayList(
    payload.playlist
  );
  return {
    ...state,
    searchResult: {
      albums,
      playlist,
    },
  };
};

export default spoty;
