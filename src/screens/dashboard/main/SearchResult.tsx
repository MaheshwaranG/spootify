import React, { useEffect, useMemo } from "react";
import { Box, Text } from "grommet";
import { doSearchCall } from "../../../store/redux/actions/spoty-dispatch-creators";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { SpotyCard } from "../../../components/MgComponents";
import {
  SpotyAppSearchResultIF,
  SpotyDataList,
} from "../../../store/redux/types/spoty";
import { StoreType } from "../../../store/redux/redux-store";
import { EmptyCircle } from "grommet-icons";
import constants from "../../../constants";
interface PropsIF {}

const FeatureList = (props: PropsIF) => {
  const searchText: string = useSelector((state: StoreType) => {
    return state.spoty.searchText;
  }, shallowEqual);

  const searchResult: SpotyAppSearchResultIF = useSelector(
    (state: StoreType) => {
      return state.spoty.searchResult;
    },
    shallowEqual
  );

  const noDataFound = useMemo(() => {
    return (
      <Box
        align="center"
        justify="center"
        height="100%"
        width="100%"
        margin="small"
        direction="row"
      >
        <EmptyCircle />
        <Text> {constants.labels.DATA_NOT_FOUND} </Text>
      </Box>
    );
  }, []);

  const dispatch: ThunkDispatch<any, any, any> = useDispatch();
  useEffect(() => {
    dispatch(doSearchCall(searchText));
  }, [searchText]);
  return (
    <>
      {!!searchResult.playlist.length ? (
        <>
          <Text size="medium" weight="bold">
            {constants.labels.PLAYLIST_SEARCH}
          </Text>
          <Box
            direction="row"
            responsive={true}
            style={{ flexWrap: "wrap" }}
            className="overflow-y"
          >
            {searchResult.playlist.map((item: SpotyDataList) => {
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
          </Box>{" "}
        </>
      ) : null}
      {!!searchResult.albums.length ? (
        <>
          <Text size="medium" weight="bold" margin={{ top: "26px" }}>
            {constants.labels.ALBUMS_SEARCH}
          </Text>
          <Box
            direction="row"
            responsive={true}
            style={{ flexWrap: "wrap" }}
            className="overflow-y"
          >
            {searchResult.albums.map((item: SpotyDataList) => {
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
          </Box>{" "}
        </>
      ) : null}
      {!searchResult.albums.length && !searchResult.playlist.length
        ? noDataFound
        : null}
    </>
  );
};

export default FeatureList;
