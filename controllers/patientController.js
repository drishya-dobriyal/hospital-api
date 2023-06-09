const Patient = require("../models/patient");
const Report = require("../models/Report");
const { STATUS_CODES } = require("./utils");

/* Register Patient */
module.exports.registerPatient = async function (req, res) {
  const { phone_number } = req.body;
  if (!phone_number) {
    return res.status(STATUS_CODES.DATA_MISSING).json({
      status: "Success",
      message: "Phone number is required",
    });
  }
  try {
    const patient = await Patient.findOne({ phone_number });
    if (patient) {
      const reports = await Report.find({ patientId: patient.id })
        .populate("patientId")
        .populate("doctorId");
      return res.status(STATUS_CODES.SUCCESS).json({
        status: "Failed",
        message: "Patient already exists",
        data: {
          patientId: patient.id,
          phone_number: patient.phone_number,
          reports,
        },
      });
    }
    const newPatient = await Patient.create({ phone_number });
    return res.status(STATUS_CODES.CREATED).send({
      status: "Success",
      message: "Patient registered",
      patient: newPatient,
      reports: [],
    });
  } catch (err) {
    console.log(err);
    return res.status(STATUS_CODES.SERVER_ERROR).send({
      status: "Success",
      message: "Server error",
    });
  }
};

/* Create Report */
module.exports.createReport = async function (req, res, next) {
  const { id: patientId } = req.params;
  const { status } = req.body;
  const doctorId = req.doctor.doctorId;
  if (!status) {
    return res.status(STATUS_CODES.DATA_MISSING).json({
      status: "Success",
      message: "Status is required",
    });
  }

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(STATUS_CODES.DATA_MISSING).json({
        status: "Failed",
        message: "Invalid patient ID",
      });
    }
    const report = await Report.create({
      status,
      date: new Date(),
      doctorId,
      patientId,
    });
    return res.status(STATUS_CODES.CREATED).send({
      status: "Success",
      message: "Report Successfully created",
      report,
    });
  } catch (err) {
    if (err.name === "ValidationError" && err.errors && err.errors.status) {
      return res.status(STATUS_CODES.DATA_MISSING).json({
        status: "Failed",
        message: err.errors.status.message,
      });
    } else {
      return res.status(STATUS_CODES.SERVER_ERROR).send({
        status: "Failed",
        message: "Server error",
      });
    }
  }
};

module.exports.fetchReports = async function (req, res) {
  const { id: patientId } = req.params;
  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(STATUS_CODES.DATA_MISSING).json({
        status: "Failed",
        message: "Invalid patient ID",
      });
    }
    const reports = await Report.find({ patientId: patient })
      .populate("doctorId")
      .populate("patientId");
    const sortedReports = reports
      .map((data) => {
        return {
          doctorName: data.doctorId.username,
          status: data.status,
          date: data.date,
          patientPhoneNumber: data.patientId.phone_number,
        };
      })
      .sort((a, b) => a.date - b.date);
    return res.status(STATUS_CODES.SUCCESS).send({
      status: "Success",
      reports: sortedReports,
    });
  } catch (err) {
    console.log(err);
    return res.status(STATUS_CODES.SERVER_ERROR).send({
      status: "Failed",
      message: "Server error",
    });
  }
};
