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

// react-github-btn
import GitHubButton from "react-github-btn";

// clsx is a utility for constructing className strings conditionally
import clsx from "clsx";
import CircleNotificationsRoundedIcon from "@mui/icons-material/CircleNotificationsRounded"; // @material-ui core components
import Drawer from "@material-ui/core/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import Switch from "@material-ui/core/Switch";
import IconButton from "@material-ui/core/IconButton";

import Icon from "@material-ui/core/Icon";

// @material-ui icons
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";

// Soft UI Dashboard Material-UI components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

// Custom styles for the Configurator
import styles from "examples/Configurator/styles";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
// Soft UI Dashboard Material-UI context
import { useSoftUIController } from "context";
import { fontWeight } from "@mui/system";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router";

function Configurator() {
  const [controller, dispatch] = useSoftUIController();
  const history = useHistory();
  const { openConfigurator, transparentSidenav, fixedNavbar, sidenavColor, authUser } = controller;
  const [disabled, setDisabled] = useState(false);
  const classes = styles({ sidenavColor });
  const sidenavColors = ["primary", "dark", "info", "success", "warning", "error"];


  // User logout functions
  const logoutall = () => {
    axios
      .get("/api/logoutall", { withCredentials: true })
      .then((res) => {
        console.log("=======.", res);
        dispatch({ type: "AUTH_USER", value: null });
        history.push("/authentication/sign-in");
        window.location.reload();
      })
      .catch((err) => console.log("==>>>>>>logout error", err));
  };
  const logout = () => {
    axios
      .get("/api/logout", { withCredentials: true })
      .then((res) => {
        console.log(res);
        dispatch({ type: "AUTH_USER", value: null });

        history.push("/authentication/sign-in");
        window.location.reload();
      })
      .catch((err) => console.log("==>>>>>>logout error", err));
  };

  // Use the useEffect hook to change the button state for the sidenav type based on window size.
  useEffect(() => {
    // A function that sets the disabled state of the buttons for the sidenav type.
    function handleDisabled() {
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
    }

    // The event listener that's calling the handleDisabled function when resizing the window.
    window.addEventListener("resize", handleDisabled);

    // Call the handleDisabled function to set the state with the initial value.
    handleDisabled();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleDisabled);
  }, []);

  const handleCloseConfigurator = () => {
    dispatch({ type: "OPEN_CONFIGURATOR", value: false });
  };

  const handleTransparentSidenav = () => {
    dispatch({ type: "TRANSPARENT_SIDENAV", value: true });
  };

  const handleWhiteSidenav = () => {
    dispatch({ type: "TRANSPARENT_SIDENAV", value: false });
  };

  const handleFixedNavbar = () => {
    dispatch({ type: "FIXED_NAVBAR", value: !fixedNavbar });
  };

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.configurator, {
          [classes.configurator_open]: openConfigurator,
          [classes.configurator_close]: !openConfigurator,
        }),
      }}
    >
      <SuiBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={3}
        pb={0.8}
        px={3}
        mt={3}
      >
        <SuiBox alignItems="center" display="flex">
          <Avatar
            alt="Remy Sharp"
            src={authUser?.profilepic}
            sx={{ marginRight: 2 }}
          />
          <SuiBox>
            <SuiTypography variant="h5">
              {authUser && authUser.name}
            </SuiTypography>
            <SuiTypography variant="body2" textColor="text">
              {authUser && authUser.email}
            </SuiTypography>
          </SuiBox>
        </SuiBox>

        {/* <CircleNotificationsRoundedIcon sx={{ fontSize: 40 }} /> */}
        <ClearRoundedIcon
          className={`material-icons-round font-bold ${classes.configurator_close_icon}`}
          onClick={handleCloseConfigurator}
        />
        {/* <Icon
          className={`material-icons-round font-bold ${classes.configurator_close_icon}`}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon> */}
      </SuiBox>

      <Divider />

      <SuiBox
        pt={3}
        pb={1}
        px={3}
        display="flex"
        justifyContent="space-between"
      >
        <SuiTypography variant="h6">Suggestions for you</SuiTypography>
        <Link variant="button" textColor="text" fontWeight="regular">
          See all
        </Link>
      </SuiBox>

      <List
        sx={{
          width: "100%",
          marginTop: 3,
          maxWidth: 360,
          bgcolor: "transparent",
        }}
      >
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=800&q=80"
            />
          </ListItemAvatar>
          <ListItemText
            primary="Brunch this "
            secondary={
              <>
                <Typography
                  sx={{ display: "inline-flex" }}
                  component="span"
                  variant="body3"
                  color="text.primary"
                >
                  @brunch jock
                </Typography>
              </>
            }
          />
          <SuiButton
            buttonColor="info"
            variant="gradient"
            onClick={handleWhiteSidenav}
            disabled={disabled}
          >
            Follow
          </SuiButton>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt="Travis Howard"
              src="https://bombaymeatco.com/wp-content/uploads/2014/11/free-profile-photo-whatsapp-4.png"
            />
          </ListItemAvatar>
          <ListItemText
            primary="Summer BBQ"
            secondary={
              <>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  @Scott_1
                </Typography>
              </>
            }
          />
          <SuiButton
            buttonColor="info"
            variant="outlined"
            onClick={handleWhiteSidenav}
            disabled={disabled}
          >
            Follow
          </SuiButton>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt="Cindy Baker"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9W8YUaeWPL4_PdUQmcZjjfHsvUDWrCIp3Lw&usqp=CAU"
            />
          </ListItemAvatar>
          <ListItemText
            primary="Oui Oui"
            secondary={
              <>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  @Sandra_Adams
                </Typography>
              </>
            }
          />
          <SuiButton
            buttonColor="info"
            variant="gradient"
            onClick={handleWhiteSidenav}
            disabled={disabled}
          >
            Follow
          </SuiButton>
        </ListItem>
      </List>
      <SuiBox pt={1.25} pb={3} px={3}>
        {/* <SuiBox>
          <SuiTypography variant="h6">Sidenav Colors</SuiTypography>

          <SuiBox my={0.5}>
            {sidenavColors.map((color) => (
              <IconButton
                key={color}
                className={clsx(classes.configurator_sidenav_color, classes[color], {
                  [classes.active_color]: sidenavColor === color,
                })}
                onClick={() => dispatch({ type: "SIDENAV_COLOR", value: color })}
              />
            ))}
          </SuiBox>
        </SuiBox> */}

        {/* <SuiBox mt={3}>
          <SuiTypography variant="h6">Sidenav Type</SuiTypography>
          <SuiTypography variant="button" textColor="text" fontWeight="regular">
            Choose between 2 different sidenav types.
          </SuiTypography>

          <SuiBox customClass={classes.configurator_sidenav_types}>
            <SuiButton
              buttonColor="info"
              variant={transparentSidenav ? "gradient" : "outlined"}
              onClick={handleTransparentSidenav}
              disabled={disabled}
              fullWidth
            >
              Transparent
            </SuiButton>
            <SuiButton
              buttonColor="info"
              variant={transparentSidenav ? "outlined" : "gradient"}
              onClick={handleWhiteSidenav}
              disabled={disabled}
              fullWidth
            >
              White
            </SuiButton>
          </SuiBox>
        </SuiBox> */}
        <SuiBox mt={3} mb={2}>
          <SuiTypography variant="h6">Navbar Fixed</SuiTypography>

          <Switch checked={fixedNavbar} onChange={handleFixedNavbar} />
        </SuiBox>

        <Divider />
        {authUser ? (
          <SuiBox mt={3}>
            <SuiTypography variant="h6">Logout User</SuiTypography>
            <SuiTypography
              variant="button"
              textColor="text"
              fontWeight="regular"
            >
              You can also Logout from all devices
            </SuiTypography>

            <SuiBox customClass={classes.configurator_sidenav_types}>
              <SuiButton
                buttonColor="info"
                variant={"gradient"}
                onClick={logout}
                fullWidth
              >
                Logout
              </SuiButton>
              <SuiButton
                buttonColor="info"
                variant={"gradient"}
                onClick={logoutall}
                fullWidth
              >
                Logout all
              </SuiButton>
            </SuiBox>
          </SuiBox>
        ) : (
          <SuiBox mt={3}>
            <SuiTypography variant="h6">Login</SuiTypography>
            <SuiTypography
              variant="button"
              textColor="text"
              fontWeight="regular"
            >
              Login with your credentials
            </SuiTypography>

            <SuiBox customClass={classes.configurator_sidenav_types}>
              <SuiButton
                buttonColor="info"
                variant={"gradient"}
                fullWidth
                component={Link}
                to="/authentication/sign-in"
              >
                Login
              </SuiButton>
            </SuiBox>
          </SuiBox>
        )}
        {/* <SuiBox mt={3} mb={2}>
          <SuiBox mb={2}>
            <SuiButton
              component={Link}
              href="https://www.creative-tim.com/product/soft-ui-dashboard-material-ui"
              target="_blank"
              rel="noreferrer"
              buttonColor="dark"
              variant="gradient"
              fullWidth
            >
              free download
            </SuiButton>
          </SuiBox>
          <SuiButton
            component={Link}
            href="https://www.creative-tim.com/learning-lab/material-ui/quick-start/soft-ui-dashboard"
            target="_blank"
            rel="noreferrer"
            buttonColor="dark"
            variant="outlined"
            fullWidth
          >
            view documentation
          </SuiButton>
        </SuiBox> */}
        {/* <SuiBox display="flex" justifyContent="center">
          <GitHubButton
            href="https://github.com/creativetimofficial/soft-ui-dashboard-material-ui"
            data-icon="octicon-star"
            data-size="large"
            data-show-count="true"
            aria-label="Star creativetimofficial/soft-ui-dashboard-material-ui on GitHub"
          >
            Star
          </GitHubButton>
        </SuiBox> */}
        {/* <SuiBox mt={3} textAlign="center">
            <SuiBox mb={0.5}>
              <SuiTypography variant="h6">Thank you for sharing!</SuiTypography>
            </SuiBox>

            <SuiBox display="flex" justifyContent="center">
              <SuiBox mr={1.5}>
                <SuiButton
                  component={Link}
                  href="//twitter.com/intent/tweet?text=Check%20Soft%20UI%20Dashboard%20%20Material-UI%20made%20by%20%40CreativeTim%20%23webdesign%20%23dashboard%20%23bootstrap5&url=https%3A%2F%2Fwww.creative-tim.com%2Fproduct%2Fsoft-ui-dashboard-pro-material"
                  target="_blank"
                  rel="noreferrer"
                  buttonColor="dark"
                >
                  <TwitterIcon />
                  &nbsp; Tweet
                </SuiButton>
              </SuiBox>
              <SuiButton
                component={Link}
                href="https://www.facebook.com/sharer/sharer.php?u=https://www.creative-tim.com/product/soft-ui-dashboard-material-ui"
                target="_blank"
                rel="noreferrer"
                buttonColor="dark"
              >
                <FacebookIcon />
                &nbsp; Share
              </SuiButton>
            </SuiBox>
          </SuiBox> */}
      </SuiBox>
    </Drawer>
  );
}

export default Configurator;
