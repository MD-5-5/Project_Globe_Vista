const express = require("express");
const router = express.Router();
const user = require("../models/user.js");
const wrapAsyncs = require("../Utils/wrapAsyncs");
const passport = require("passport");
const { saveredirectUrl } = require("../middleware.js");
const userController = require("../Controllers/users.js");

//SIGNUP ROUTER
router
  .route("/signup")
  .get(userController.rendersignupform)
  .post(wrapAsyncs(userController.signup));

//LOGIN ROUTER
router
  .route("/login")
  .get(userController.renderloginform)
  .post(
    saveredirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

//LOGOUT ROUTER
router.get("/logout", userController.logout);

module.exports = router;
