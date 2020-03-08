/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const DBNAME = "smartanalytics"; //change it to your db name
const connectionString = `mongodb://localhost:27017/${DBNAME}`; //change it to your db connection String
mongoose.connect(connectionString, { useNewUrlParser: true }).then(a => {});
const userRouter = require("./routes/user.route");
const accountRouter = require("./routes/account.route");
const analyticAccountRouter = require("./routes/analyticAccount.route");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.send({ message: "Welcome to Smart analytics api.." });
});
app.get("/images/*", (req, res) => {
  res.sendFile(path.join(__dirname, req.path));
});
app.use("/api/user", userRouter);
app.use("/api/account", accountRouter);
app.use("/api/analyticAccount", analyticAccountRouter);

const port = process.env.port || 3331;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on("error", console.error);
