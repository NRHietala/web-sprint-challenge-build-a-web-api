const express = require("express");
const helmet = require("helmet");
const server = express();
server.use(express.json());
server.use(helmet());

const actionRouter = require("../api/actions/actions-router");
const projectRouter = require("../api/projects/projects-router");

server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);

server.use("*", (_, res) => {
  res.status(404).json({ message: "Resource not found" });
});

module.exports = server;
