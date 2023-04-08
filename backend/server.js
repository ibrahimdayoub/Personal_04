const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const path = require("path");

//Routes
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

//Middlewares
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

//Routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// --------------------------deployment------------------------------
/*
  const __dirname1 = path.resolve();

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname1, "/frontend/build")));

    app.get("*", (req, res) =>
      res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
    );
  } else {
    app.get("/", (req, res) => {
      res.send("API is running..");
    });
  }
*/
// --------------------------deployment------------------------------

//Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;
const server = app.listen(
  PORT,
  console.log(`Server running on port: ${PORT}`.yellow.underline)
);

//Socket.io
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000", //React.js
  },
});

io.on("connection", (socket) => {

  console.log("Connected by socket "+socket.id);
  
  //Event 1
  socket.on("setup", (user) => {
    socket.join(user._id);
    socket.emit("connected");
  });

  //Event 2
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined room "+room);
  });
  
  //Event 3
  socket.on("typing", (room) => {
    socket.in(room).emit("typing")
  });
  
  //Event 4
  socket.on("stop typing", (room) => {
    socket.in(room).emit("stop typing")
  });

  //Event 5
  socket.on("new message", (newMessage) => {
    let chat = newMessage.chat;

    if (!chat.users) return console.log("Chat has not users");

    chat.users.forEach((user) => {
      if (user._id == newMessage.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessage);
    });
  });

  socket.off("setup", () => {
    console.log("Disconnected by socket "+socket.id);
    socket.leave(user._id);
  });
});
