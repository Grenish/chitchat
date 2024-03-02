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

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.post("/rooms", (req, res) => {
  const { username } = req.body;

  // Generate a new room ID
  const roomId =
    uuidv4().split("-")[1] +
    "-" +
    Math.floor(Math.random() * 1000) +
    "-" +
    uuidv4().split("-")[0];

  // Respond with the room ID
  res.json({ roomId });
});

io.on("connection", (socket) => {
  console.log("a user connected");

  // When a user connects, send the username to all clients
  socket.on("user connected", ({ username }) => {
    io.emit("user connected", { username: username });
  });

  // When a user disconnects, send the username to all clients
  socket.on("user disconnected", ({ username }) => {
    io.emit("user disconnected", { username: username });
  });

  // When a user sends a chat message, send it to all clients
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  // When a user disconnects, log it
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
