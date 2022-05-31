const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  assignee: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = todoSchema;
