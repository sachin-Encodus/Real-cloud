import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import { Link } from "react-router-dom";
export default function ShowUsers({ data }) {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        position: "relative",
        backgroundColor: "#ffffff",
        borderRadius: 4,
        alignItems: "center",
        boxShadow:
          "0rem 0.5rem 1.625rem -0.25rem rgb(20 20 20 / 15%), 0rem 0.5rem 0.5625rem -0.3125rem rgb(20 20 20 / 6%);",
      }}
    >
      {data &&
        data.map((user) => {
          return (
            <ListItem key={user._id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={user.profilepic} />
              </ListItemAvatar>
              <Link to={"/userProfile/" + user._id}>
                <ListItemText
                  primary={user.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {user.email}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </Link>
            </ListItem>
          );
        })}
    </List>
  );
}
