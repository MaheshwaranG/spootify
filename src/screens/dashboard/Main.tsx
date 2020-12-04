import React, { useCallback } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { StoreType } from "../../store/redux/redux-store";
import { ActiveTypeEnum } from "../../store/redux/types/spoty";
import FeatureList from "./main/FeatureList";
import LastWeekRelease from "./main/LastWeekRelease";
import SearchResult from "./main/SearchResult";
import { Box } from "grommet";

interface PropsIF {}

const Main = (props: PropsIF) => {
  const currentActive: ActiveTypeEnum = useSelector((state: StoreType) => {
    return state.spoty.active;
  }, shallowEqual);
  const selectResponse = useCallback(() => {
    switch (currentActive) {
      case ActiveTypeEnum.featured:
        return <FeatureList />;
      case ActiveTypeEnum.new:
        return <LastWeekRelease />;
      case ActiveTypeEnum.search:
        return <SearchResult />;
      default:
        break;
    }
  }, [currentActive]);
  return (
    <Box pad="medium" height="100%" width="100%">
      {selectResponse()}
    </Box>
  );
};

export default Main;
