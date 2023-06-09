const express = require("express");
const bodyParser = require("body-parser");

const db = require("./config/mongoose");
const app = express();
const PORT = 8000;

/* add body parser */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", require("./routes"));

/* listen at port */
app.listen(PORT, (err) => {
  if (err) console.log("Error - listening to app - ", err);
  console.log("App listening at port: ", PORT);
});
