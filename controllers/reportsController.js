const Report = require("../models/Report");
const Patient = require("../models/patient");
const { STATUS_CODES } = require("./utils");

/* Fetch Reports by status */
module.exports.fetchReports = async function (req, res) {
  try {
    const reports = await Report.find({ status: req.params.status })
      .populate("doctorId")
      .populate("patientId");
    const sortedReports = reports.map((data) => {
      return {
        doctorName: data.doctorId.username,
        status: data.status,
        date: data.date,
        patientPhoneNumber: data.patientId.phone_number,
      };
    });
    return res.status(STATUS_CODES.SUCCESS).send({
      status: "Success",
      reports: sortedReports,
    });
  } catch (err) {
    console.log(err);
    return res.status(STATUS_CODES.SERVER_ERROR).send({
      status: "Success",
      message: "Server error",
    });
  }
};
