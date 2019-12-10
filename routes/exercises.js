var bodyParser = require("body-parser");
const _ = require("lodash");
const { Exercise, validate } = require("../models/exercise-log.model");
const { User } = require("../models/user.model");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/log", async (req, res) => {
  const from = new Date(req.query.from);
  const to = new Date(req.query.to);

  const userId = req.query.userId;
  if (!userId) return res.status(400).send("No userId input found.");

  const users = await User.findById(userId);
  if (!users) return res.status(400).send("Invalid userId.");

  console.log(userId);

  let logs = await Exercise.find({
    userId: userId,
    date: {
      $lt: to != "Invalid Date" ? to.getTime() : Date.now(),
      $gt: from != "Invalid Date" ? from.getTime() : 0
    }
  })
    .sort("-date")
    .limit(parseInt(req.query.limit));
  res.send(logs);
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
  exercise = _.pick(exercise, [
    "_id",
    "userId",
    "description",
    "duration",
    "date"
  ]);
  res.send(exercise);
});

module.exports = router;

// 5def9b8733c09546740145b3
