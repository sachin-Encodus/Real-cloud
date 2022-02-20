import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import "./style.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import { TextField } from "@mui/material";
import SuiBox from "components/SuiBox";
import SendIcon from "@mui/icons-material/Send";
import SuiButton from "components/SuiButton";
import Messages from './messages/Messages';
import axios from "axios";
import { useParams } from "react-router";
import { useSoftUIController } from 'context';
import { io } from "socket.io-client";
import "./messages/messages.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
const Converstation = () => {
  const scrollRef = useRef();
  const socket = useRef();

  const [controller] = useSoftUIController();
  const { authUser, onlineUser, socketUser } = controller;
  const [user, setUser] = useState(null);
  const [online, setOnline] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [deletemsg, setDeletemsg] = useState(0);
  const [typing, setTyping] = useState(false);
  // console.log("currentchat_is", currentChat);
  const { userId } = useParams();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  // console.log("onLineusers", onlineUser);
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log("socketUser", socketUser);
  useEffect(() => {
    socket.current = socketUser;
    if (socketUser) {
      console.log("socketUser", socket.current);
      socket.current.on("getMessage", (data) => {
        console.log("==========xxxxxxxxxxxxx", data);

        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      });
    }
  }, [socketUser]);
  //  const receiverId =
  //    currentChat && currentChat[0]?.members.find((member) => member !== authUser._id);
  // useEffect(() => {
  //   const currentchat = async () => {
  //     try {
  //       const res = await axios.get("/api/conversations/findone/" + id);
  //       setCurrentChat(res.data);

  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   currentchat();

  // }, [id]);

  // !
  useEffect(() => {
    const fetchCoversation = async () => {
      try {
        const res = await axios.get(
          `/api/conversations/find/${authUser?._id}/${userId}`
        );
        if (res.data !== null) {
          setCurrentChat(res.data);
        } else {
          handleClicke();
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (authUser) {
      fetchCoversation();
    }
  }, [authUser, userId, deletemsg]);

  const handleClicke = async () => {
    console.log("handle clicking");
    try {
      const res = await axios.post("/api/conversations", {
        senderId: authUser?._id,
        receiverId: userId,
      });
      setCurrentChat(res.data);
      console.log("handle", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("/api/find-user/" + userId);
        setUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [userId]);

  // ! setmessage and emit mesaage
  const sendMessage = (e) => {
    if (socketUser) {
      setNewMessage(e.target.value);
      socket.current.emit("typingmsg", { userId });
    }
  };

  useEffect(() => {
    arrivalMessage &&
      currentChat &&
      currentChat.members.includes(arrivalMessage.sender) &&
      setMessage((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/api/messages/" + currentChat._id);
        setMessage(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);
  useEffect(() => {
    axios
      .put("/api/messages/isSeen", {
        sender: userId,
        conversationId: currentChat?._id,
      })
      .then((data) => {
        if (socketUser) {
          socket.current.emit("msgSeen", { userId, currentChat });
          socket.current.on("seen", (data) => {
            const getMessages = async () => {
              try {
                const res = await axios.get(
                  "/api/messages/" + currentChat?._id
                );
                setMessage(res.data);
                console.log("seendata========xxxxxxxxxx", data);
              } catch (err) {
                console.log(err);
              }
            };
            getMessages();

            // setCurrentChat(data.currentChat);
          });
        }
        console.log("seen", data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [arrivalMessage, currentChat]);

  // useEffect(() => {
  //   if (socketUser) {
  //   }
  // }, []);

  useEffect(() => {
    if (socketUser) {
      socket.current.on("usertyping", (data) => {
        setTyping(true);
        console.log("typing");

        setTimeout(() => {
          setTyping(false);
        }, 3000);
      });
    }
  }, [authUser, socketUser]);

  useEffect(() => {
    if (socketUser) {
      socket.current.on("deletedmsg", (data) => {
        const deletedmsg = async () => {
          const res = await axios.get(
            `/api/conversations/find/${authUser?._id}/${userId}`
          );
          setCurrentChat(res.data);
        };
        deletedmsg();
        console.log("calldelete");
      });
    }
  }, [currentChat, socketUser]);

  const delteMymessage = async () => {
    try {
      const res = await axios.delete(
        ` /api/messages/${currentChat?._id}/${authUser?._id}`
      );
      setDeletemsg(res);
      socket.current.emit("msgdelete", { userId });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("calling");
    const msg = {
      sender: authUser._id,
      text: newMessage,
      conversationId: currentChat?._id,
    };
    console.log(message);

    const receiverId =
      currentChat &&
      currentChat.members.find((member) => member !== authUser._id);
    console.log("receivedId", receiverId);
    if (socketUser) {
      socket.current.emit("sendMessage", {
        senderId: authUser._id,
        receiverId,
        text: newMessage,
      });
    }

    try {
      const res = await axios.post("/api/messages", msg);
      setMessage([...message, res.data]);
      console.log(res.data);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  useEffect(() => {
    const data = onlineUser?.includes(user?._id);

    setOnline(data);
  }, [onlineUser, user]);
  console.log("message", message);
  console.log("curentchatId", currentChat?._id);
  return (
    <DashboardLayout>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          style={{
            height: 80,
            justifyContent: "center",
            backgroundColor: "black",
          }}
          position="static"
        >
          <Toolbar>
            <Link to={"/userProfile/" + userId}>
              <Avatar
                alt="Remy Sharp"
                src={user?.profilepic}
                sx={{ marginRight: 2, width: 56, height: 56 }}
              />
            </Link>

            <SuiBox sx={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                component="h5"
                sx={{ display: "block", color: "white" }}
              >
                {user?.name}
              </Typography>
              <p style={{ flexGrow: 1, color: "lightgrey" }}>
                {online ? "online" : ""}
              </p>
            </SuiBox>

            <SuiBox>
              <Button
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                style={{ color: "white" }}
              >
                <MoreVertIcon fontSize="medium" />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={delteMymessage}>delete chat</MenuItem>
                <MenuItem onClick={handleClose}>clear chat</MenuItem>
              </Menu>
            </SuiBox>
          </Toolbar>
        </AppBar>
      </Box>
      <SuiBox className="messenger">
        <SuiBox className="chatBox">
          <SuiBox className="chatBoxWrapper">
            <SuiBox className="chatBoxTop">
              {message.map((m, index) => (
                <div key={index} ref={scrollRef}>
                  <Messages
                    own={m.sender === authUser?._id}
                    authUser={authUser}
                    typing={typing}
                    user={user}
                    message={m}
                  />
                </div>
              ))}
            </SuiBox>

            {typing ? (
              <div class="chat-bubble">
                <div class="typing">
                  <div class="dot"></div>
                  <div class="dot"></div>
                  <div class="dot"></div>
                </div>
              </div>
            ) : null}

            <SuiBox>
              <SuiBox className="chatBoxBottom">
                <input
                  placeholder="Message"
                  onChange={(e) => sendMessage(e)}
                  value={newMessage}
                  style={{
                    fontSize: 17,
                    width: "100%",
                    borderRadius: 30,
                    padding: 20,
                    marginRight: 20,
                    border: "none",
                    outline: "none",
                    backgroundColor: "#f1f1f1",
                  }}
                />
                {/* <TextField
                style={{
                  marginRight: 20,
                }}
                fullWidth
                placeholder="message"
                id="fullWidth"
                onChange={(e) => sendMessage(e)}
                value={newMessage}
              /> */}
                {newMessage !== "" ? (
                  <SuiButton onClick={handleSubmit}>
                    <SendIcon />
                  </SuiButton>
                ) : null}
              </SuiBox>
            </SuiBox>
          </SuiBox>
        </SuiBox>
      </SuiBox>
    </DashboardLayout>
  );
};

export default Converstation;
