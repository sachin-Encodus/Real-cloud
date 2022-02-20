/**
=========================================================
* Soft UI Dashboard Material-UI - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect, useRef } from "react";

// react-router components
import { Route, Switch, Redirect, useLocation } from "react-router-dom";

// jss components
import { create } from "jss";

// jss-rtl components
import rtl from "jss-rtl";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
// @material-ui core components
import { ThemeProvider, StylesProvider, jssPreset } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Icon from "@material-ui/core/Icon";

// Soft UI Dashboard Material-UI components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard Material-UI example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Soft UI Dashboard Material-UI themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Soft UI Dashboard Material-UI routes
import routes from "routes";

// Soft UI Dashboard Material-UI contexts
import { useSoftUIController } from "context";
import UserProfile from "layouts/profile/UserProfile";
import EditProfile from "./layouts/profile/EditProfile";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";
import Conversation from "./layouts/chat/conversation";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};



export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, authUser } =
    controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const socket = useRef();

  useEffect(() => {
    if (authUser) {
      const socketdata = io("https://real-cloud.herokuapp.com", {
        transports: ["websocket"],
      });
      socket.current = socketdata;
      dispatch({ type: "SOCKET_CONNECTION", value: socketdata });
    }
  }, [authUser]);

  useEffect(() => {
    if (authUser) {
      socket.current.emit("addUser", authUser._id);
      socket.current.on("getUsers", (users) => {
        const data = authUser?.following.filter((f) =>
          users.some((u) => u.userId === f)
        );
        console.log("onlineUser", users);

        dispatch({ type: "ONLINE_USER", value: data });
      });
    }
  }, [authUser]);

  // useEffect(() => {
  //   if (authUser) {
  //     console.log("=====", authUser);
  //     // socket.on("connect", () => {
  //     //   // x8WIv7-mJelg7on_ALbx
  //     // });
  //     socket.emit("join", { email: authUser.email });
  //   }
  // }, [authUser]);

  // socket.on("confirm", (id) => {
  //   console.log(id);
  //   setOpen(true); // x8WIv7-mJelg7on_ALbx
  // });
  // JSS presets for the rtl

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      dispatch({ type: "MINI_SIDENAV", value: false });
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      dispatch({ type: "MINI_SIDENAV", value: true });
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => {
    dispatch({ type: "OPEN_CONFIGURATOR", value: !openConfigurator });
  };

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            component={route.component}
            key={route.key}
          />
        );
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              !Important
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Someone is fatching your data is that you or not
            </Typography>
            <Link
              to="#"
              style={{ color: "green" }}
              onClick={() => {
                socket.emit("confirmed");
                handleClose();
              }}
            >
              Yes,i'm in
            </Link>
            <Link
              to="#"
              style={{ color: "red", marginLeft: 20 }}
              onClick={() => {
                socket.emit("denied");
                handleClose();
              }}
            >
              Denied
            </Link>
          </Box>
        </Modal>
      </div>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
        </>
      )}

      {layout === "vr" && <Configurator />}
      <Switch>
        {getRoutes(routes)}
        <Route exact path="/userProfile/:id" component={UserProfile} />
        <Route exact path="/edit" component={EditProfile} />
        <Route exact path="/conversation/:userId" component={Conversation} />
        <Redirect from="*" to="/" />
      </Switch>
    </ThemeProvider>
  );
}
