import React, { useEffect } from "react";
import { Box, Text } from "grommet";
import { getFeatureListCall } from "../../../store/redux/actions/spoty-dispatch-creators";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { SpotyCard } from "../../../components/MgComponents";
import { SpotyDataList } from "../../../store/redux/types/spoty";
import { StoreType } from "../../../store/redux/redux-store";
import constants from "../../../constants";
interface PropsIF {}

const FeatureList = (props: PropsIF) => {
  const list: SpotyDataList[] = useSelector((state: StoreType) => {
    return state.spoty.featureList;
  }, shallowEqual);
  const dispatch: ThunkDispatch<any, any, any> = useDispatch();
  useEffect(() => {
    dispatch(getFeatureListCall());
  }, []);
  return (
    <>
      <Text size="medium" weight="bold">
        {constants.labels.FEATURED}
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
      </Box>
    </>
  );
};

export default FeatureList;
