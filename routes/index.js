const express = require("express");

const homeController = require("../controllers/homeController");
const router = express.Router();

/* Assign Handler */
router.get("/", homeController.home);
router.use("/doctors", require("./doctors"));
router.use("/patients", require("./patients"));
router.use("/reports", require("./reports"));

module.exports = router;
