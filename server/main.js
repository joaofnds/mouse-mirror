const express = require("express");
const app = express();
const http = require("http").Server(app);
const path = require("path");
const io = require("socket.io")(http);

app.use("/", express.static(path.join(__dirname, "../client")));

io.on("connection", socket => {
  socket.on("mousemove", coords => {
    socket.broadcast.emit("mousemove", coords);
  });
});

http.listen(3000, () => {
  console.log("listening on port 3000");
});
