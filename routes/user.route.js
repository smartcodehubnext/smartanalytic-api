const express = require("express");
const path = require("path");
const fs = require("fs");

const userController = require("../controllers/user.controller");
const router = express.Router();

router.route("/GetAuthUrl").get(userController.GetAuthUrl);

router.route("/VerifyEmail").post(userController.VerifyEmail);
router.route("/ResendEmail").post(userController.ResendEmail);

router
  .route("/")
  .get(userController.GetAll)
  .post(userController.Create);

router.route("/login").post(userController.Authenticate);

router
  .route("/:id")
  .get(userController.GetOneById)
  .put(userController.UpdateById)
  .delete(userController.Delete);

module.exports = router;
