const express = require("express");
const router = express.Router();

const reportsController = require("../controllers/reportsController");

/* Assign Handler */
router.get("/:status", reportsController.fetchReports);

module.exports = router;
