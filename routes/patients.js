const express = require("express");
const router = express.Router();
const { verifyToken } = require("../config/jwt");

const patientController = require("../controllers/patientController");

/* Assign Handler */
router.post("/register", patientController.registerPatient);
router.post("/:id/create_report", verifyToken, patientController.createReport);
router.get("/:id/all_reports", patientController.fetchReports);

module.exports = router;
