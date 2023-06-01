require("dotenv").config();
const User = require("../Models/userModel");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");

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
