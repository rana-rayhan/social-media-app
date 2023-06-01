require("dotenv").config();
const { default: mongoose } = require("mongoose");

mongoose
  .connect(process.env.DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB is connected"))
  .catch((err) => console.log("DB is not connected = " + err));
