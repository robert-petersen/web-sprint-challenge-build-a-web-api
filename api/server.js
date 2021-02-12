const express = require('express');
const server = express();
const helmet = require("helmet");

server.use(helmet());
server.use(express.json());

// Complete your server here!
// Do NOT `server.listen()` inside this file!

const actionsRouter = require("./actions/actions-router.js");
const projectsRouter = require("./projects/projects-router.js");

server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

server.get("/", (req, res) => {
  res.send("Welcome!")
})

module.exports = server;
