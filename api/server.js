const express = require("express");
const helmet = require("helmet");
const server = express();
server.use(express.json());

server.use(helmet());

server.use("*", (_, res) => {
  res.status(404).json({ message: "Resource not found" });
});

module.exports = server;
