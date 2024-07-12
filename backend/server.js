const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const chats = require("./data/data");
const connectDB = require("./config/db");
const userRouters = require("./routes/userRoutes");
const pathNotFoundRouters = require("./routes/pathNotFoundRouters");
const chatRouters = require("./routes/chatRoutes");
const messageRouters = require("./routes/messageRouters");
const path = require("path");
const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
dotenv.config();
connectDB();

app.use(express.json());
app.use("/api/chat", chatRouters);

app.use("/api/user", userRouters);
app.use("/api/message", messageRouters);

//------------ Deployment-------------//
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api is running");
  });
}

//------------ Deployment-------------//
app.use(pathNotFoundRouters);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Backend Start At ${PORT}`));

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

io.on("connection", (Socket) => {
  console.log("Connected To Socket.io...");
  // Socket.emit('connected')
  Socket.on("setup", (userData) => {
    Socket.join(userData._id);
  });

  Socket.on("join room", (chatId) => {
    Socket.join(chatId);
  });

  Socket.on("new message", (Message) => {
    if (!Message.chat) {
      return;
    }
    // console.log(Message)
    Socket.in(Message.sender._id).emit("message received", Message);
    Message.chat.users.forEach((user) => {
      if (user._id === Message.sender._id) return;
      Socket.in(user._id).emit("message received", Message);
    });
  });

  Socket.on("typing", (room) => {
    Socket.in(room).emit("typing", room);
  });
  Socket.on("stop typing", (room) => {
    Socket.in(room).emit("stop typing", room);
  });
  Socket.on("add friend", ({ data, receiverUserId }) => {
    Socket.in(receiverUserId).emit("add friend", data);
  });
  Socket.on("new group", (Chat) => {
    Chat.users.forEach((user) => {
      Socket.in(user._id).emit("new group", Chat);
    });
  });
});
