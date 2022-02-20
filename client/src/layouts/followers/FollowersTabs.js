import * as React from "react";
import PropTypes from "prop-types";
// import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Link } from "react-router-dom";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0.2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FollowersTabs({ followers, following }) {
  console.log("==========***********", followers, following);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ width: "100%", marginTop: 5 }}>
      <AppBar
        style={{ backgroundColor: "transparent", color: "black", boxShadow: "none" }}
        position="static"
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Followers" {...a11yProps(0)} />
          <Tab label="Following" {...a11yProps(1)} />
          {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
        </Tabs>
      </AppBar>
      {/* <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      > */}
      <TabPanel value={value} index={0} dir={theme.direction}>
        {followers.map(({ _id, name, email, profilepic }) => {
          return (
            <List sx={{ width: "100%" }}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar style={{ marginRight: 12 }}>
                  <Avatar sx={{ width: 60, height: 60 }} alt="Remy Sharp" src={profilepic} />
                </ListItemAvatar>
                <Link to={"/userProfile/" + _id}>
                  <ListItemText
                    primary={name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          sd {email}
                        </Typography>
                        {" — I'll be in your neighborhood doing errands this…"}
                      </React.Fragment>
                    }
                  />
                </Link>
              </ListItem>
            </List>
          );
        })}
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        {following.map(({ _id, name, email, profilepic }) => {
          return (
            <List sx={{ width: "100%" }}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar style={{ marginRight: 12 }}>
                  <Avatar sx={{ width: 60, height: 60 }} alt="Remy Sharp" src={profilepic} />
                </ListItemAvatar>
                <Link to={"/userProfile/" + _id}>
                  <ListItemText
                    primary={name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          sd {email}
                        </Typography>
                        {" — I'll be in your neighborhood doing errands this…"}
                      </React.Fragment>
                    }
                  />
                </Link>
              </ListItem>
            </List>
          );
        })}
      </TabPanel>
      {/* <TabPanel value={value} index={2} dir={theme.direction}>
        Item Three
      </TabPanel> */}
      {/* </SwipeableViews> */}
    </Box>
  );
}
