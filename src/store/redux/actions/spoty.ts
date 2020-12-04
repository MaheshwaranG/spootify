import actions from "../action";
import {
  ActiveTypeEnum,
  DoSearchActionIF,
  DoSearchActionPayloadIF,
  FeatureListActionIF,
  LastWeekRelaseActionIF,
  LastWeekRelaseActionPayloadIF,
  SetActiveActionIF,
} from "../types/spoty";
import { FeatureListActionPayloadIF } from "../types/spoty";
export const setActive = (
  active: ActiveTypeEnum,
  searchTextValue?: string | undefined
): SetActiveActionIF => {
  const searchText: string = !!searchTextValue ? searchTextValue : "";
  return {
    type: actions.spoty.setActive,
    payload: {
      active,
      searchText,
    },
  };
};

export const getFeatureList = (
  featurelist: FeatureListActionPayloadIF
): FeatureListActionIF => {
  return {
    type: actions.spoty.getFeatureList,
    payload: featurelist,
  };
};

export const getLastWeekReleasedSongs = (
  lastWeekSongs: LastWeekRelaseActionPayloadIF
): LastWeekRelaseActionIF => {
  return {
    type: actions.spoty.getLastWeekRelase,
    payload: lastWeekSongs,
  };
};

export const doSearch = (data: DoSearchActionPayloadIF): DoSearchActionIF => {
  return {
    type: actions.spoty.dosearch,
    payload: data,
  };
};
