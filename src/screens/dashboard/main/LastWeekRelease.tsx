import React, { useCallback, useEffect, useMemo } from "react";
import { Box, Text } from "grommet";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { SpotyCard } from "../../../components/MgComponents";
import { SpotyDataList, SpotyPagingIF } from "../../../store/redux/types/spoty";
import { StoreType } from "../../../store/redux/redux-store";
import { getLastWeekReleasedSongsCall } from "../../../store/redux/actions/spoty-dispatch-creators";
import { Down } from "grommet-icons";
import constants from "../../../constants";

interface PropsIF {}

const LastWeekRelease = (props: PropsIF) => {
  const list: SpotyDataList[] = useSelector((state: StoreType) => {
    return state.spoty.lastWeekSongs;
  }, shallowEqual);
  const dispatch: ThunkDispatch<any, any, any> = useDispatch();
  useEffect(() => {
    dispatch(getLastWeekReleasedSongsCall());
  }, []);
  const paging: SpotyPagingIF = useSelector((state: StoreType) => {
    return state.spoty.paging;
  }, shallowEqual);
  const lazyLoadByClick = useCallback((event: any, offset) => {
    event.preventDefault();
    dispatch(getLastWeekReleasedSongsCall(offset));
  }, []);
  const loadMoreData = useCallback(() => {
    if (paging.offset < paging.total) {
      return (
        <Box align="center" justify="center" width="100%" margin="small">
          <Box
            round="full"
            onClick={(event: any) => lazyLoadByClick(event, paging.offset)}
            background={"brand"}
            title="Load More"
            pad="xsmall"
          >
            <Down />
          </Box>
        </Box>
      );
    }
    return null;
  }, [paging]);
  return (
    <>
      <Text size="medium" weight="bold">
        {constants.labels.NEW}
      </Text>
      <Box
        direction="row"
        responsive={true}
        style={{ flexWrap: "wrap" }}
        className="overflow-y"
      >
        {list.map((item: SpotyDataList) => {
          return (
            <SpotyCard
              id={item.id}
              message={item.message}
              name={item.name}
              images={item.images}
              url={item.url}
              key={item.id}
            ></SpotyCard>
          );
        })}
        {loadMoreData()}
      </Box>
    </>
  );
};

export default LastWeekRelease;
