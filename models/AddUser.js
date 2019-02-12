const mongoose = require("mongoose");

const AddUser = new mongoose.Schema({
  title: { type: String, require: true },
  name: { type: String, require: true },
  comment: { type: String, required: true },
  age: { type: String, required: true },
  comments: [
    {
      type: String,
      defined: true
    }
  ]
});

module.exports = mongoose.model("AddUser", AddUser);
