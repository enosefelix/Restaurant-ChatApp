const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const session = require('express-session')
const { Server } = require("socket.io");
const MemoryStore = require('memorystore')(session);


const io = new Server(server);
//using the session middleware
const sessionMiddleware = session({
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
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
    // If session ID already exists, add socket to existing room
    console.log("new session found", sessionId)
    sessionRooms[sessionId] = {
      deviceId: socket.id,
      currentOrder: [],
      orderHistory: []
    };
    socket.join(sessionId)
  }

  let order_history = sessionRooms[sessionId].orderHistory;
  let current_order = sessionRooms[sessionId].currentOrder;

  // Listen for incoming bot messages
  socket.on("bot-message", async (message) => {
    console.log("Bot message received:", message);
    socket.emit("bot-message", message);
  });

  // Listen for incoming user messages
  socket.on("user-message", async (message) => {
    console.log("User message received:", message);
    if (message === "1") {
      socket.emit(
        "bot-message",
        "Here is a list of items you can order:\n 1: Italian Rice,\n 2: Noodles,\n 3: Spaghetti.\n 4: Bread and Beans\n Please select one by typing its number."
      );

      // Wait for the user to select an item from the menu
      socket.on("message", async (message) => {
        if (message === "1") {
          current_order.push("Italian Rice");
          socket.emit(
            "bot-message",
            "Italian Rice has been added to your order. Do you want to add more items to your order? If not, type 99 to checkout."
          );
        } else if (message === "2") {
          current_order.push("Noodles");
          socket.emit(
            "bot-message",
            "Noodles has been added to your order. Do you want to add more items to your order? If not, type 99 to checkout."
          );
        } else if (message === "3") {
          current_order.push("Spaghetti");
          socket.emit(
            "bot-message",
            "Spaghetti has been added to your order. Do you want to add more items to your order? If not, type 99 to checkout."
          );
        } else if (message === "4") {
          current_order.push("Bread and Beans");
          socket.emit(
            "bot-message",
            "Bread and Beans has been added to your order. Do you want to add more items to your order? If not, type 99 to checkout."
          );
        }
      });
    } else if (message === "99") {
      if (current_order.length === 0) {

        socket.emit("bot-message", "No order to place");
      } else {
        let order = []
        socket.emit("bot-message", "Order placed");
        order.push(current_order);
        order_history.push(current_order)
        current_order = [];
        console.log(order_history)
        console.log(order)
      }
    } else if (message === "98") {
      if (order_history.length === 0) {
        socket.emit("bot-message", "Wow Such empty\nTo Order\nInput 2: Italian Rice,\n Input 3: Noodles,\n Input 4: Spagetti.\n");
      }
      else if (order_history.length > 0) {
        let orderHistoryMessage = "";
        const arr = ["First", "Second", "Third", "Fourth", "Fifth", "Seventh", "Eight", "Ninth", "Tenth"]
        for (let i = 0; i < order_history.length; i++) {
          orderHistoryMessage += arr[i] + " Order: " + order_history[i].join(", ") + "\n";
          socket.emit("bot-message", orderHistoryMessage);
        }
      }
    } else if (message === "97") {
      if (current_order.length === 0) {
        socket.emit("bot-message", "No current order\nOrder Now\nInput 2: Italian Rice,\n Input 3: Noodles,\n Input 4: Spagetti.\n");
      } else {
        socket.emit(
          "bot-message",
          `Here is your current order: ${current_order.join(", ")}`
        );
      }
    } else if (message === "0") {
      current_order = [];
      socket.emit("bot-message", "Order cancelled");
    } else {
      socket.emit("bot-message", "Invalid input, please try again.")
    }
  });
  // Listen for disconnection event
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("listening on 3000");
});