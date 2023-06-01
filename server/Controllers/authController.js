const UserModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//
//
//
// profil User || profile user || profile user
const userProfile = (req, res) => {
  // Only authenticated users with valid JWT can access this route
  try {
    res.json({
      user: req.user,
    });
  } catch (error) {
    res.status(500).json("Server error || user not found");
  }
};
//
//
//
// Write User || Create user || register user
const registerUser = async (req, res) => {
  const { username, password, firstname, lastname } = req.body;

  try {
    if (!username || !password || !firstname || !lastname)
      throw Error("All fileds must be filed");
    // is User exist ?
    const isUser = await UserModel.findOne({ username });
    if (isUser) throw Error("Username is in use");
    // Hashing password
    const hashPassword = await bcrypt.hash(password, 10);
    // Create user
    const newUser = await UserModel.create({
      username,
      password: hashPassword,
      firstname,
      lastname,
    });

    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//
//
// Login User || Login user || Login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) throw Error("All fileds must be filed");
    // is User exist ?
    const isUser = await UserModel.findOne({ username });
    if (!isUser) throw Error("Username or Email is not exist");
    // Hashing password
    const match = await bcrypt.compare(password, isUser.password);
    if (!match) throw Error("Password is incorrect");

    const payload = {
      id: isUser._id,
      username: isUser.username,
    };
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "3d",
    });

    res.status(200).json({ isUser, token: "Bearer " + token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//
//
//
// export controllers
module.exports = {
  userProfile,
  registerUser,
  loginUser,
};
