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

import { useEffect, useState } from "react";

// react-router-dom components
import { Link, useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Soft UI Dashboard Material-UI components
import SuiBox from "components/SuiBox";

// Custom styles for the LayoutContainer
import styles from "examples/LayoutContainers/DashboardLayout/styles";

// Soft UI Dashboard Material-UI context
import { useSoftUIController } from "context";
import Appbar from "examples/app/Appbar";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Paper from "@mui/material/Paper";

// const styles = (theme) => ({
//   root: {
//     backgroundColor: "blue",
//     // Match [0, md)
//     //       [0, 900px)
//     [theme.breakpoints.down("md")]: {
//       backgroundColor: "red",
//     },
//   },
// });

function LayoutContainer({ children }) {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction } = controller;
  const { pathname } = useLocation();
  const classes = styles({ miniSidenav, direction });
  const [value, setValue] = useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    dispatch({ type: "LAYOUT", value: "dashboard" });
  }, [pathname]);

  return (
    // <SuiBox style={{ display: "flex", justifyContent: "space-between" }}>
    <>
      <SuiBox customClass={classes.layoutContainer}>{children}</SuiBox>
      {/* <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation sx={{ width: "100%" }} value={value} onChange={handleChange}>
          <BottomNavigationAction
            label="Recents"
            value="recents"
            icon={<RestoreIcon />}
            component={Link}
            to="/"
          />
          <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOnIcon />} />
          <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
        </BottomNavigation>
      </Paper> */}
    </>
    //   <Appbar />
    // </SuiBox>
  );
}

// Typechecking props for the LayoutContainer
LayoutContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutContainer;
