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

import { useState, useEffect } from "react";
import ShowUsers from "../Users/ShowUsers";
// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
// @material-ui core components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import Icon from "@material-ui/core/Icon";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive"; // Soft UI Dashboard Material-UI components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import TextField from "@mui/material/TextField";
// Soft UI Dashboard Material-UI example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/NotificationItem";
import ListIcon from "@mui/icons-material/List";
// Custom styles for DashboardNavbar
import styles from "examples/Navbars/DashboardNavbar/styles";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
// Soft UI Dashboard Material-UI context
import { useSoftUIController } from "context";
import "../../../style.css";
// Images
import team2 from "assets/images/team-2.jpg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import axios from "axios";

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, onlineUser } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const classes = styles({ transparentNavbar, absolute, light, isMini });
  const route = useLocation().pathname.split("/").slice(1);
  const [userData, setUserdata] = useState([]);
  const [userName, setUserName] = useState([]);
  const [open, setOpen] = useState(false);
   const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  console.log(userName);
  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      dispatch({
        type: "TRANSPARENT_NAVBAR",
        value: (fixedNavbar && window.scrollY === 0) || !fixedNavbar,
      });
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);
//  useEffect(() => {
//    const getConversations = async () => {
//      try {
//        const res = await axios.get("/api/conversations/" + authUser._id);
//        setConversations(res.data);
//      } catch (err) {
//        console.log(err);
//      }
//    };

//    getConversations();
//  }, [authUser]);

  useEffect(() => {
    axios
      .get("/api/friends")
      .then(({ data }) => {
     
        
        setFriends(data.FollowingList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUser?.includes(f._id)));
  }, [friends, onlineUser]);
  // useEffect(() => {
  //   setUserName(
  //     userData &&
  //       userData.filter((user) => user.email.toLowerCase().includes(searcharry.toLowerCase()))
  //   );
  // }, [searcharry, userData]);
  console.log(userData);
  const handlechange = (id) => {
    console.log(id);
    axios
      .get("/api/username/" + id)
      .then(({ data }) => {
        console.log("=>>>>>>>>>>>>>>>", data.userdata);
        setUserdata(data.userdata);
        if (userData.length > 0) {
          setOpen(true);
        }
      })
      .catch((err) => {
        setOpen(false);
        console.log(err);
      });
  };
console.log("onlineFriends", onlineFriends);
  // useEffect(() => {
  //   if (userData.length > 0) {
  //     setOpen(true);
  //   } else {
  //     setOpen(false);
  //   }
  // }, [userData]);

  const handleMiniSidenav = () => dispatch({ type: "MINI_SIDENAV", value: !miniSidenav });
  const handleConfiguratorOpen = () =>
    dispatch({ type: "OPEN_CONFIGURATOR", value: !openConfigurator });
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      style={{ marginTop: "1rem" }}
    >
      {/* {userData &&
        userData.map((user) => {
          return (

          );
        })} */}

      <NotificationItem
        user={userData}
        image={<img src={team2} alt="person" />}
        title={["New message", "from Laur"]}
        date="13 minutes ago"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        image={<img src={logoSpotify} alt="person" />}
        title={["New album", "by Travis Scott"]}
        date="1 day"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        color="secondary"
        image={
          <Icon fontSize="small" className="material-icon-round text-white">
            payment
          </Icon>
        }
        title={["", "Payment successfully completed"]}
        date="2 days"
        onClick={handleCloseMenu}
      />
    </Menu>
  );

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      className={classes.navbar}
    >
      {isMini ? null : (
        <SuiBox style={{ padding: 15 }}>
          <SuiBox
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <input
              placeholder="Search user"
              onChange={(e) => handlechange(e.target.value)}
              style={{
                fontSize: 17,
                width: "100%",
                borderRadius: 30,
                padding: 17,
                marginRight: 20,
                border: "none",
                outline: "none",
                backgroundColor: "#f1f1f1",
              }}
            />
            <IconButton
              size="small"
              color="inherit"
              onClick={handleMiniSidenav}
            >
              <ListIcon />
            </IconButton>
          </SuiBox>
          <SuiBox>{open ? <ShowUsers data={userData} /> : null}</SuiBox>
          {/* <SuiBox color={light ? "white" : "inherit"}>
            <IconButton
              size="small"
              color="inherit"
              onClick={handleMiniSidenav}
            >
              <ListIcon />
            </IconButton>
           

            
          </SuiBox> */}
        </SuiBox>
      )}

      <h3 style={{ marginLeft: 15, color: "black" }}>Active</h3>
      <Stack direction="row" className="avatar-scroll " spacing={2}>
        {onlineFriends &&
          onlineFriends.map((online) => (
            <Link key={online._id} to={"/userProfile/" + online._id}>
              <div key={online._id} className="avatar_border">
                <Avatar
                  style={{ width: 60, height: 60, margin: 1 }}
                  alt="Remy Sharp"
                  src={online.profilepic}
                />
              </div>
              <h4 style={{ color: "black", textAlign: "center" }}>
                {online.name}
              </h4>
            </Link>
          ))}
      </Stack>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
