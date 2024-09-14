import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

// Maintain a list of active rooms
const activeRooms = {};

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.post("/rooms", (req, res) => {
  let { roomID } = req.body;

  // Ensure the roomID is unique
  if (!roomID) {
    do {
      roomID =
        uuidv4().split("-")[1] +
        "-" +
        Math.floor(Math.random() * 1000) +
        "-" +
        uuidv4().split("-")[0];
    } while (activeRooms[roomID]); // Keep generating until we find a unique ID
  }

  activeRooms[roomID] = true;

  res.json({ roomID });
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("user connected", ({ username, roomID }) => {
    if (!activeRooms[roomID]) {
      socket.emit("error", "Room does not exist");
      return;
    }

    socket.join(roomID);

    io.to(roomID).emit("user connected", { username });
  });

});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("user connected", ({ username, roomID }) => {
    if (!activeRooms[roomID]) {
      socket.emit("error", "Room does not exist");
      return;
    }

    socket.join(roomID);

    io.to(roomID).emit("user connected", { username });
  });

  socket.on("user disconnected", ({ username, roomID }) => {
    if (!activeRooms[roomID]) {
      socket.emit("error", "Room does not exist");
      return;
    }

    socket.leave(roomID);

    io.to(roomID).emit("user disconnected", { username });
  });

  socket.on("chat message", (msg) => {
    const roomID = Object.keys(socket.rooms)[1];

    io.to(roomID).emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
