import React from "react";
import { AppBar } from "components/MgComponents";
import { Heading, Box } from "grommet";
import { StoreType } from "../../store/redux/redux-store";
import { connect } from "react-redux";
import UserProfile from "./headers/UserProfile";
import SearchInput from "./headers/SearchInput";
import constants from "../../constants";
interface PropsIF {}

const Header = (props: PropsIF) => {
  return (
    <>
      <AppBar className="full">
        <Box direction="row" gap="medium">
          <Heading margin="none" level={3}>
            {constants.labels.APP_NAME}
          </Heading>
          <SearchInput />
        </Box>

        <UserProfile />
      </AppBar>
    </>
  );
};

export default Header;
