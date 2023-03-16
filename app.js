const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const session = require('express-session')
const { Server } = require("socket.io");
const MemoryStore = require('memorystore')(session);


const io = new Server(server);

//use the the session middleware to save sessions
const sessionMiddleware = session({
  store: new MemoryStore({
  }),
  secret: 'your-secret-key-here',
  resave: false,
  saveUninitialized: true
});

app.use(sessionMiddleware);

io.use((socket, next) => {
    sessionMiddleware(socket.request, {}, next)
});

// Serve static files from the public directory
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/restaurant.html");
});

let sessionRooms = {};

io.on("connection", (socket) => {
  const sessionId = socket.request.session.id;
  console.log("User connected:", socket.id);
  console.log("session id " + sessionId);

  if (sessionRooms.hasOwnProperty(sessionId)) {

    // If session ID doesn't exist, create a new room and add it to sessionRooms object
    const newRoom = `session_${sessionId}`;
    socket.join(newRoom);
    console.log("existing session found " + newRoom)
  } else {

    // If session ID already exists, add socketID to existing room
    console.log("new session found", sessionId)
    sessionRooms[sessionId] = {
      deviceId: socket.id,
      currentOrder: [],
      orderHistory: []
    };
    socket.join(sessionId)
  }

  // Listen for incoming bot messages
  socket.on("bot-message", async (message) => {
    console.log("Bot message received:", message);
    socket.emit("bot-message", message);
  });

  // Listen for incoming user messages
  socket.on("user-message", async (message) => {
    console.log("User message received:", message);
    socket.emit("user-message", message);
  });

  // Listen for disconnection event
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("listening on 3000");
});