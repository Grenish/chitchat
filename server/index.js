import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(cors());
const httpServer = http.createServer(app);
const io = new Server(httpServer);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

io.on("connection", (socket) => {
  console.log("New client connected");
  activeUsers++;

  socket.emit("activeUsers", activeUsers);
  socket.emit("initialMessages", messages);

  // Handle a new message
  socket.on("newMessage", (data) => {
    messages.push(data);
    io.emit("message", data); // Broadcast to all clients
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    activeUsers--;
    io.emit("activeUsers", activeUsers);
  });
});

httpServer.listen(port, () => {
  console.log(`Server is running on port http://localhost/${port}`);
});
