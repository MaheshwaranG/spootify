import React, { useCallback, useRef, useState } from "react";
import { Avatar, Box, Drop, Button } from "grommet";
import { User } from "grommet-icons";
import { StoreType } from "../../../store/redux/redux-store";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { logout } from "../../../store/redux/actions/auth";
import constants from "../../../constants";
interface PropsIF {
  userName: string;
  email: string;
  image: string;
  dispatch: ThunkDispatch<any, any, any>;
}

const UserProfile = (props: PropsIF) => {
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const targetComponent: any = useRef();
  const closeDetailPopup = useCallback(() => {
    setIsDetailOpen(false);
  }, []);
  const openDetailPopup = useCallback(() => {
    setIsDetailOpen(true);
  }, []);
  const signOut = useCallback((event: any) => {
    props.dispatch(logout());
    setTimeout(() => {
      window.location.pathname = "/";
    }, 10);
  }, []);
  return (
    <>
      <Box ref={targetComponent}>
        {props.image ? (
          <Avatar src={props.image} onClick={openDetailPopup} />
        ) : (
          <Avatar onClick={openDetailPopup}>
            <User />
          </Avatar>
        )}
      </Box>
      {isDetailOpen && (
        <Drop
          target={targetComponent.current}
          align={{ top: "bottom", right: "right" }}
          onClickOutside={closeDetailPopup}
          onEsc={closeDetailPopup}
          elevation="medium"
          overflow="hidden"
          style={{ backgroundColor: "transparent" }}
        >
          <Box
            direction="column"
            pad="small"
            align="start"
            justify="center"
            animation={{
              type: "slideDown",
              duration: 20,
            }}
            background="brand"
            gap="small"
            margin="6px"
            width={{
              width: "small",
              max: "small",
            }}
            round="small"
          >
            <Box className="text-oveflow" title={props.userName}>
              {props.userName}
            </Box>
            <Box className="text-oveflow" title={props.email}>
              {props.email}
            </Box>
            <Box onClick={signOut} className="text-oveflow">
              {constants.labels.LOGOUT}
            </Box>
          </Box>
        </Drop>
      )}
    </>
  );
};

const mapStateToProps = (state: StoreType) => {
  return {
    userName: state.auth.user!.userName,
    email: state.auth.user!.email,
    image:
      state.auth.user!.images!.length > 0 ? state.auth.user!.images![0] : "",
  };
};

export default connect(mapStateToProps)(UserProfile);
