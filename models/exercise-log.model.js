const Joi = require('joi');
const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true 
    },
  description: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 250
  },
  duration: {
      type: Number,
      required: true,
      min: 0,
      max: 1000
  },
  date: {
      type: Date,
      default: Date.now()
  }
});


const Exercise = mongoose.model('Exercise', exerciseSchema);

function validateExercise(exercise) {
  const schema = {
    userId: Joi.objectId().required(),
    description: Joi.string().max(350).required(),
    duration: Joi.number().positive().less(1000).required(),
    date: Joi.date().iso().required()
  };

  return Joi.validate(exercise, schema);
}

exports.Exercise = Exercise; 
// exports.exerciseSchema = Exercise; 
exports.validate = validateExercise;