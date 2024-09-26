const express = require("express");
const app = express();
const port = 3000;

let clients = [];

const brodcatsTime = () => {
  const currentTime = new Date().toLocaleTimeString();
  clients.forEach((res) => {
    res.write(`Current time is ${currentTime}\n\n`);
  });
};

setInterval(brodcatsTime, 1000);

app.get("/time", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  clients.push(res);

  req.on("close", () => {
    clients = clients.filter((client) => client !== res);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/time`);
});
