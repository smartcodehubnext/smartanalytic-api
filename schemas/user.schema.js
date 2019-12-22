const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: "String"
  },
  email: {
    lowercase: true,
    required: true,
    unique: true,
    type: "String"
  },
  password: {
    type: "String"
  },
  isTermAggred: {
    type: "Boolean",
    default: false
  },
  emailConfirmed: {
    type: "Boolean",
    default: false
  },
  createdOn: {
    type: "Date",
    default: new Date()
  }
});
module.exports = mongoose.model("user", userSchema);
