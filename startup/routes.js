const express = require("express");
const home = require("../routes/home");
const users = require("../routes/users");
const exercises = require("../routes/exercises");
const error = require("../middleware/error");

module.exports = function(app) {
  app.use(express.static('public'));
  app.use(express.json());
  app.use("/", home);
  app.use("/api", users);
  app.use("/api/exercise", exercises);

  app.use(error);
};
