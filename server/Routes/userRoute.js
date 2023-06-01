const {
  viewUser,
  singleUser,
  updateUser,
  deleteUser,
  followUser,
  // unFollowUser,
} = require("../Controllers/userController");
const route = require("express").Router();
// const passport = require("passport");
//
//
//
// Read User || view user || passport.authenticate("jwt", { session: false }),
route.get("/", viewUser);
//
// Read single User || view single user
route.get("/:id", singleUser);
//
// Update User || Update user
route.put("/:id", updateUser);
//
// delete User || delete user
route.delete("/:id", deleteUser);
//
// follow User || follow user
route.put("/:id/follow", followUser);
//
// unfollow User || unfollow user
// route.put("/:id/unfollow", unFollowUser);
//
//
//
//
module.exports = route;
