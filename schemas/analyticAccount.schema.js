const mongoose = require("mongoose");

const analyticAccountSchema = new mongoose.Schema({
  userId: { type: "String" },
  accountId: { type: "String" },
  id: {
    type: "String"
  },
  kind: {
    type: "String"
  },
  name: {
    type: "String"
  },
  webProperties: {
    type: ["Mixed"]
  }
});
module.exports = mongoose.model("analyticAccount", analyticAccountSchema);
