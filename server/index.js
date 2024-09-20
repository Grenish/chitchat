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
  console.log("A user is connected");

  socket.on("message", (msg) => {
    console.log(msg);

    io.emit("Message: ", msg);
  });

  socket.on("disconnect", () => {
    console.log("A user is disconnected");
  });
});

httpServer.listen(port, () => {
  console.log(`Server is running on port http://localhost/${port}`);
});
