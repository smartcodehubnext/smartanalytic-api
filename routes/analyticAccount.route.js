const express = require("express");
const path = require("path");
const fs = require("fs");

const analyticAccountController = require("../controllers/analyticAccount.controller");
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
  .get(authMiddleware, analyticAccountController.GetOneByUserId);
router
  .route("/fetchAccounts/:accountId")
  .get(authMiddleware, analyticAccountController.FetchAnalyticAccounts);

router.route("/").get(authMiddleware, analyticAccountController.GetAll);

router
  .route("/:id")
  .get(authMiddleware, analyticAccountController.GetOneById)
  .delete(authMiddleware, analyticAccountController.Delete);


  router
  .route("/fetchAnalyticdata/:viewId/:accountId")
  .get(authMiddleware, analyticAccountController.FetchAnalyticdata)
  

module.exports = router;
