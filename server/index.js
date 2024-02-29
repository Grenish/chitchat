import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import { v4 as uuidv4 } from 'uuid';


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


io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
