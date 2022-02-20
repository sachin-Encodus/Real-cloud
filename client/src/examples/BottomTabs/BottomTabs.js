import { useEffect, useState } from "react";

// react-router-dom components
import { Link, useLocation } from "react-router-dom";
import Appbar from "examples/app/Appbar";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ModeCommentRoundedIcon from "@mui/icons-material/ModeCommentRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { useSoftUIController } from "context";

const useStyles = makeStyles((theme) => ({
  box: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: "green",
    paddingTop: 1,

    [theme.breakpoints.up("xl")]: {
      display: "none",
    },
  },
}));

const BottomTabs = () => {
  const [controller, dispatch] = useSoftUIController();
  const { openConfigurator, authUser } = controller;
  const classes = useStyles();

  const [value, setValue] = useState("home");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleConfiguratorOpen = () => {
    dispatch({ type: "OPEN_CONFIGURATOR", value: !openConfigurator });
  };
  return (
    <Paper className={classes.box} elevation={3}>
      <BottomNavigation sx={{}} value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="Home"
          value="home"
          icon={<HomeRoundedIcon />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          label="Profile"
          value="profile"
          icon={<PersonRoundedIcon />}
          component={Link}
          to="/profile"
        />
        <BottomNavigationAction
          label="Chat"
          value="chat"
          icon={<ModeCommentRoundedIcon />}
          component={Link}
          to="/chats"
        />
        <BottomNavigationAction
          label="Setting"
          value="setting"
          icon={<SettingsIcon />}
          onClick={handleConfiguratorOpen}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomTabs;
