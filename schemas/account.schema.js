const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  userId: {
    type: "String"
  },
  refresh_token: {
    type: "String"
  },
  createdOn: {
    type: "Date",
    default: new Date()
  },
  updatedOn: {
    type: "Date",
    default: new Date()
  }
});
module.exports = mongoose.model("account", accountSchema);
