const mongoose = require("mongoose");

/* Connect to mongodb */
mongoose.connect("mongodb://localhost/project");

const db = mongoose.connection;

/* Listen to Error event */
db.on("error", console.error.bind(console, `Error connecting to mongodb`));

/* Open mongodb */
db.once("open", () => {
  console.log(`Succesfully connected to database mongodb`);
});
