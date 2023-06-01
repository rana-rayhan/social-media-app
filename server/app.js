require("./config/passport"); // passport authintication file ---***
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
