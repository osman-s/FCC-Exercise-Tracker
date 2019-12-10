var bodyParser = require('body-parser')
const _ = require('lodash')
const { User, validate } = require("../models/user.model");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get("/users", async (req, res) => {
  const user = await User.find({}).sort({name: 1}).select('name _id');
  res.send(user);
});

router.post("/exercise/new-user", urlencodedParser, async (req, res) => {
  console.log(req.body)
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ name: req.body.name });
  if (user) return res.status(400).send("User already registered.");

  user = new User({
    name: req.body.name
  });
  await user.save();
  user = _.pick(user, ["name", "_id"])
  res.send(user);
});

module.exports = router;
