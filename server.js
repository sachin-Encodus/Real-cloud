require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const connection = require("./src/db/dbconnection");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Emitter = require("events");
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

const EventEmitter = new Emitter();
exports.emitter = EventEmitter;
app.set("eventemitter", EventEmitter);

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// const vr = require("./config/dev")

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};




io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  // console.log("socket-users",users);
  //when ceonnect

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    console.log("New user connected.", users);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);

    if (user) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        receiverId,
        text,
      });
    }
  });

  // usertyping
  socket.on("typingmsg", ({ userId }) => {
    const user = getUser(userId);
    if (user) {
      io.to(user.socketId).emit("usertyping", {
        userId,
      });
    }
  });
  // delete msg
  socket.on("msgdelete", ({ userId }) => {
    const user = getUser(userId);
    if (user) {
      io.to(user.socketId).emit("deletedmsg", {
        userId,
      });
    }
  });

  // msg seen
  socket.on("msgSeen", ({ userId, currentChat }) => {
    const user = getUser(userId);
    if (user) {
      io.to(user.socketId).emit("seen", {
        currentChat,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

const UserRouter = require("./src/routes/auth.routes");
const ConversationRoute = require("./src/routes/conversation.routes")
const MessageRoute = require("./src/routes/message.routes")

app.use("/api", UserRouter);
app.use("/api/conversations", ConversationRoute);
app.use("/api/messages", MessageRoute);
// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  // app.use(express.static(path.join(__dirname, "client/build")));
  // app.use(express.static("client/build"));
  app.use(express.static(path.resolve(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

server.listen(port, () => {
  console.log(`App is running on port ${port}`);
});




  // //when disconnect

  // // console.log("New user connected", socket.id);
  // //  socket.on('join', (data) => {

  // //    console.log("user join",data.email );
  // //   socket.join(data.email);
  // // });
  // // socket.on("join", (email) => {
  // //   console.log("socket.io: user join ", email);
  // // });
  // socket.on("confirmed", () => {
  //   EventEmitter.emit("confirmed-req");
  // });

  // socket.on("denied", () => {
  //   EventEmitter.emit("denied-req");
  // });

  // EventEmitter.on("confirm-req", (name) => {
  //   // console.log("===============xxxxxxxx", name);
  //   // io.to('user@example.com').emit('confirm', {msg: 'hello world.'});
  //   socket.emit("confirm", name);
  // });

  // // EventEmitter.on("orderPlaced", (deviceData) => {
  // //   // console.log("===============xxxxxxxx", deviceData.email);
  // //   socket.emit("Orderd", deviceData);
  // // });