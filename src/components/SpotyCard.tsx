import React from "react";
import { Box, Image, Text } from "grommet";
interface PropsIF {
  images?:
    | {
        height: number;
        url: string;
        width: number;
      }
    | undefined
    | null;
  name: string;
  message: string;
  id: string;
  url?: string | undefined | null;
}

const SpotyCard = (props: PropsIF) => (
  <Box
    elevation="small"
    round="small"
    style={{ position: "relative", flex: "1 1 20%" }}
    width={{
      max: "360px",
      width: "360px",
      min: "100px",
    }}
    height="small"
    overflow="hidden"
    flex={true}
    margin="xsmall"
    key={props.id}
  >
    <Image fit="cover" src={!!props.images ? props.images!.url : ""} />
    <Box
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "40%",
      }}
    >
      <Text
        weight="bold"
        size="medium"
        margin="xsmall"
        className="text-oveflow"
        style={{
          zIndex: 1,
          color: "#ffffff",
        }}
        title={props.name}
      >
        {props.name}
      </Text>
      <Text
        margin="xsmall"
        className="text-oveflow"
        style={{
          zIndex: 1,
          color: "#ffffff",
        }}
        title={props.message}
      >
        {props.message}
      </Text>
      <Box
        style={{
          position: "absolute",
          opacity: 0.5,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
        background="brand"
      />
    </Box>
  </Box>
);

export { SpotyCard };
