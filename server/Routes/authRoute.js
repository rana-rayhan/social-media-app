const {
  registerUser,
  loginUser,
  userProfile,
} = require("../Controllers/authController");
const passport = require("passport");

const route = require("express").Router();
//
//
// Profile route
route.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  userProfile
);
//
//
// Write User || Create user || register user
route.post("/register", registerUser);
//
// Login User || Login user || Login user
route.post("/login", loginUser);
//
//
//
//
module.exports = route;
