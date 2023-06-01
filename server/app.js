// require("./config/passport"); // passport authintication file ---***
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
//
// custom routes
const authRoute = require("./Routes/authRoute");
const userRoute = require("./Routes/userRoute");
const postRoute = require("./Routes/postRoute");
const app = express();
//
//
//
//
// i have external file also in config folder ----***
const User = require("./Models/userModel");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET; // SECRET key form dotenv

passport.use(
  // getting token while login & sending in header, then checking token with jwt_payload
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      //const { id } = jwt_payload; // extract id || email from jwt_payload

      const user = await User.findOne({ _id: jwt_payload.id }); // find user with token id
      if (user) {
        //return user as req.user
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);
//--------------- end passport auth -------------*****
//
//
// middleware
app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(passport.initialize()); // initialized passport for user auhtinticat ---***
//
//
// middleware for checking request method
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
//
//
// Routes handle middilware
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/post", postRoute);
//
//
// error route
app.use("*", (req, res) => res.send("404 page not found"));
//
//server error middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
//
//
// export app to index file
module.exports = app;
