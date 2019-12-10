var bodyParser = require("body-parser");
const _ = require("lodash");
const { Exercise, validate } = require("../models/exercise-log.model");
const { User } = require("../models/user.model");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/log", async (req, res) => {
  const user = await User.find({})
    .sort({ name: 1 })
    .select("name _id");
  res.send(user);
});

router.post("/add", urlencodedParser, async (req, res) => {
  console.log(req.body);
  let logs = req.body;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid userId.");

  let exercise = new Exercise({
    userId: logs.userId,
    description: logs.description,
    duration: parseInt(logs.duration),
    date: logs.date
  });
  await exercise.save();
  exercise = _.pick(exercise, ["_id", "userId", "description", "duration", "date"]);
  console.log(exercise);
  res.send(exercise);
});

module.exports = router;

// 5def9b8733c09546740145b3
