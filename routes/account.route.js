const express = require("express");
const path = require("path");
const fs = require("fs");

const accountController = require("../controllers/account.controller");
const router = express.Router();

const { verify } = require("jsonwebtoken");
const ENV_SECRET_STRING = "SmartAnalytic";

const authMiddleware = (req, res, next) => {
  const token = req.header("authorization");
  console.log(token);

  if (!token) return res.status(401).send("UnAuthorized");
  const payLoad = verify(token, ENV_SECRET_STRING);
  req.payLoad = payLoad;
  req.uid = payLoad._id;
  if (!payLoad) return res.status(401).send("UnAuthorized");
  next();
};
router
  .route("/GetByUser")
  .get(authMiddleware, accountController.GetOneByUserId);

router
  .route("/")
  .get(authMiddleware, accountController.GetAll)
  .post(authMiddleware, accountController.Create);

router
  .route("/:id")
  .get(authMiddleware, accountController.GetOneById)
  .put(authMiddleware, accountController.UpdateById)
  .delete(authMiddleware, accountController.Delete);

module.exports = router;
