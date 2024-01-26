import express from "express";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
app.use(cors());

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
