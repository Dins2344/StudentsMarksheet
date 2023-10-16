

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please add name"],
    unique: true,
  },
  age: {
    type: Number,
    required: [true, "please add age"],
  },
  markOne: {
    type: Number,
    required: [true, "please add mark 1"],
  },
  markTwo: {
    type: Number,
    required: [true, "please add mark 2"],
  },
  result: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema, "user");

module.exports =  User
