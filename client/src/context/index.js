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

/**
  This file is used for controlling the global states of the components,
  you can customize the states for the different components here.
*/

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { io } from "socket.io-client";
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import axios from "axios";

// The Soft UI Dashboard Material-UI main context
const SoftUI = createContext();

// Soft UI Dashboard Material-UI reducer
function reducer(state, action) {
  switch (action.type) {
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "SOCKET_CONNECTION": {
      return { ...state, socketUser: action.value };
    }
    case "AUTH_USER": {
      return { ...state, authUser: action.value };
    }
    case "ONLINE_USER": {
      return { ...state, onlineUser: action.value };
    }
    case "CURRENT_CHAT": {
      return { ...state, currentChat: action.value };
    }
    case "TRANSPARENT_SIDENAV": {
      return { ...state, transparentSidenav: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "DIRECTION": {
      return { ...state, direction: action.value };
    }
    case "LAYOUT": {
      return { ...state, layout: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Soft UI Dashboard Material-UI context provider
function SoftUIControllerProvider({ children }) {
  const initialState = {
    miniSidenav: false,
    transparentSidenav: true,
    sidenavColor: "info",
    transparentNavbar: true,
    fixedNavbar: true,
    openConfigurator: true,
    direction: "ltr",
    layout: "dashboard",
    userData: "",
    socketUser: "",
    authUser: "",
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios
      .get("/api/user")
      .then(({ data }) => dispatch({ type: "AUTH_USER", value: data }))
      .catch((err) => console.log(err));
  }, []);

  return (
    <SoftUI.Provider value={[controller, dispatch]}>{children}</SoftUI.Provider>
  );
}

// Soft UI Dashboard Material-UI custom hook for using context
function useSoftUIController() {
  return useContext(SoftUI);
}

// Typechecking props for the SoftUIControllerProvider
SoftUIControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { SoftUIControllerProvider, useSoftUIController };
