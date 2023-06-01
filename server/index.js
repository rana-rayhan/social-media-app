require("dotenv").config();
require("./Config/db");
const app = require("./app");

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on por no ${port}!`));
