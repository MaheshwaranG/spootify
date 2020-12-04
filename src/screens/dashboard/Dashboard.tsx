import React from "react";
import { Grid, Box } from "grommet";
import Header from "./Header";
import Sider from "./Sider";
import Main from "./Main";

interface PropsIF {}

const Dashboard = (props: PropsIF) => {
  return (
    <Grid
      id="spootify-app"
      className="full"
      rows={["xxsmall", "flex"]}
      columns={["xsmall", "flex"]}
      gap="none"
      areas={[
        { name: "header", start: [0, 0], end: [1, 0] },
        { name: "nav", start: [0, 1], end: [0, 1] },
        { name: "main", start: [1, 1], end: [1, 1] },
      ]}
    >
      <Box gridArea="header" className="full">
        <Header />
      </Box>
      <Box gridArea="nav" background="light-2">
        <Sider />
      </Box>
      <Box gridArea="main">
        <Main />
      </Box>
    </Grid>
  );
};

export default Dashboard;
