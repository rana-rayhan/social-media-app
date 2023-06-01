const UserModel = require("../Models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
//
//
// Read Users || view users
const viewUser = async (req, res) => {
  try {
    const viewUsers = await UserModel.find().select("-password");
    res.status(200).json(viewUsers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error -R" });
  }
};

//
//
// Read single Users || view single users
const singleUser = async (req, res) => {
  const id = req.params.id;
  try {
    //checking mongoose id isVaild
    if (!mongoose.Types.ObjectId.isValid(id)) throw Error("No such workout");
    const user = await UserModel.findById({ _id: id });
    if (!user) throw Error("User not exist");
    if (user) {
      const { password, ...otherDetails } = user._doc;
      res.status(200).json(otherDetails);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
//
//
//
//update user
const updateUser = async (req, res) => {
  const id = req.params.id;
  const { userId, currentUserAdminStatus } = req.body;

  if (id === userId || currentUserAdminStatus) {
    try {
      // if (password) {
      //   const salt = await bcrypt.genSalt(10);
      //   req.body.password = await bcrypt.hash(password, salt);
      // }
      const user = await new UserModel.findByIdAndUpdate(
        { _id: id },
        { ...req.body },
        {
          new: true,
        }
      );
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access Denied! you can only update your own profile");
  }
};

//
//
//
//delete workout
const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    //checking mongoose id isVaild
    if (!mongoose.Types.ObjectId.isValid(id))
      throw Error("No such user from user controller");

    const user = await UserModel.findOneAndDelete({ _id: id });
    if (!user) {
      return res.status(404).json({ error: "No such user v2" });
    }
    res.status(202).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//
//
//
// Follow a User
const followUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId } = req.body;

  if (currentUserId === id) {
    res.status(403).json("Action forbidden, you can't follow yourself");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(currentUserId);

      if (!followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $push: { followers: currentUserId } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json("User followed!");
      } else if (followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $pull: { followers: currentUserId } });
        await followingUser.updateOne({ $pull: { following: id } });
        res.status(200).json("User Unfollowed!");
      } else {
        res.status(403).json("User is already followed by you");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

//
//
// UnFollow a User
// const unFollowUser = async (req, res) => {
//   const id = req.params.id;
//   const { currentUserId } = req.body;

//   if (currentUserId === id) {
//     res.status(403).json("Action forbidden, you can't unfollow yourself");
//   } else {
//     try {
//       const followUser = await UserModel.findById(id);
//       const followingUser = await UserModel.findById(currentUserId);

//       if (followUser.followers.includes(currentUserId)) {
//         await followUser.updateOne({ $pull: { followers: currentUserId } });
//         await followingUser.updateOne({ $pull: { following: id } });
//         res.status(200).json("User Unfollowed!");
//       } else {
//         res.status(403).json("User is not followed by you");
//       }
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   }
// };
//
//
//
module.exports = {
  viewUser,
  singleUser,
  updateUser,
  deleteUser,
  followUser,
  // unFollowUser,
};
