const express = require("express");
const home = require("../routes/home");
// const genres = require("../routes/genres");
// const rentals = require("../routes/rentals");
const users = require("../routes/users");
const exercises = require("../routes/exercises");
const error = require("../middleware/error");

module.exports = function(app) {
  app.use(express.static('public'));
  app.use(express.json());
  app.use("/", home);
  // app.use("/api/genres", genres);
  // app.use("/api/rentals", rentals);
  app.use("/api", users);
  app.use("/api/exercise", exercises);

  app.use(error);
};
