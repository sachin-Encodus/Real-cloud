import React from 'react'
import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../style.css";
import Button from "@mui/material/Button";
const Chatlist = ({ conversations, authUser, dispatch, index }) => {
  const [user, setUser] = useState(null);
  console.log(user);

  useEffect(() => {
    const friendId = conversations.members.find((m) => m !== authUser?._id);
    // console.log("conversations", conversations);
    // dispatch({ type: "CURRENT_CHAT", value: conversations });
    const getUser = async () => {
      try {
        const res = await axios.get("/api/find-user/" + friendId);
        setUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [authUser, conversations]);

  return (
    <Button
      variant="text"
      component={Link}
      style={{ color: "black", display: "block", textTransform: "none" }}
      to={"/conversation/" + user?._id}
    >
      {/* <Button variant="text">Text</Button> */}
      <ListItem key={index} alignItems="center">
        <ListItemAvatar className="avatar_border" style={{ marginRight: 12 }}>
          <Avatar
            sx={{ width: 60, height: 60, margin: 0.1 }}
            alt="Remy Sharp"
            src={user?.profilepic}
          />
        </ListItemAvatar>

        <ListItemText
          primary={user?.name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {user?.email}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </Button>
  );
};

export default Chatlist
