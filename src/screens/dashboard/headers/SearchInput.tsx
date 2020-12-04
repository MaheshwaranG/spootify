import React, { useCallback, useRef, useState } from "react";
import { TextInput } from "grommet";

import { StoreType } from "../../../store/redux/redux-store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { setActive } from "../../../store/redux/actions/spoty";
import { ActiveTypeEnum } from "../../../store/redux/types/spoty";

interface PropsIF {}

const UserProfile = (props: PropsIF) => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const searchTextValue = useSelector((state: StoreType) => {
    return state.spoty.searchText;
  }, shallowEqual);
  const searchSongs = useCallback(
    (event: any) => {
      event.preventDefault();
      if (!!event.target.value && !!event.target.value.length) {
        dispatch(setActive(ActiveTypeEnum.search, event.target.value));
      } else {
        dispatch(setActive(ActiveTypeEnum.featured));
      }
    },
    [searchTextValue]
  );
  return (
    <>
      <TextInput
        placeholder="Search"
        value={searchTextValue}
        size="small"
        style={{
          height: 32,
          borderColor: "#ffffff",
          color: "#ffffff",
          borderRadius: 15,
        }}
        onChange={searchSongs}
      />
    </>
  );
};

export default UserProfile;
