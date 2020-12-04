import React, { useCallback, useMemo, useRef, useState } from "react";
import { Nav, Anchor, Drop, Box } from "grommet";
import { Music, Clock } from "grommet-icons";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { StoreType } from "../../store/redux/redux-store";
import { ActiveTypeEnum } from "../../store/redux/types/spoty";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { setActive } from "../../store/redux/actions/spoty";

interface PropsIF {}

const Sider = (props: PropsIF) => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

  const currentAction = useSelector((state: StoreType) => {
    return state.spoty.active;
  }, shallowEqual);
  const loadFeatureList = useCallback(
    (event: any) => {
      event.preventDefault();
      dispatch(setActive(ActiveTypeEnum.featured));
    },
    [currentAction]
  );
  const loadLastWeekRelease = useCallback(
    (event: any) => {
      event.preventDefault();
      dispatch(setActive(ActiveTypeEnum.new));
    },
    [currentAction]
  );

  return (
    <Nav direction="column" pad="medium">
      <Anchor
        icon={<Music />}
        // label="Featured Playlists"
        size="medium"
        onClick={loadFeatureList}
        className={
          currentAction === ActiveTypeEnum.featured ? "" : "nav-inactive"
        }
      />
      <Anchor
        icon={<Clock />}
        // label="New Songs"
        size="medium"
        onClick={loadLastWeekRelease}
        className={currentAction === ActiveTypeEnum.new ? "" : "nav-inactive"}
      />
    </Nav>
  );
};

export default Sider;
