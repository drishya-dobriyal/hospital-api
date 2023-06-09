const Doctor = require("../models/doctors");
const { generateToken } = require("../config/jwt");
const { STATUS_CODES } = require("./utils");

/* Regiter a doctor */
module.exports.register = async function (req, res) {
  const { username, password } = req.body;
  /* Request parameters missing */
  if (!username || !password) {
    return res.status(STATUS_CODES.DATA_MISSING).send({
      status: "Failed",
      message: "Username and password is required",
    });
  }

  try {
    /* find doctor with the username */
    const doctor = await Doctor.findOne({ username });
    if (doctor) {
      /* Registration failed if username already exists */
      return res.status(STATUS_CODES.SUCCESS).send({
        status: "Failed",
        message: "Doctor already exists",
      });
    }

    /* create new doctor */
    const newDoctor = await Doctor.create({
      username,
      password,
    });

    /* registration sucessful */
    return res.status(STATUS_CODES.CREATED).send({
      status: "Success",
      message: "Successfully reqgistered",
    });
  } catch (err) {
    /* Error while registration */
    console.log(err);
    return res.status(STATUS_CODES.SERVER_ERROR).send({
      status: "Success",
      message: "Server error",
    });
  }
};

/* login doctor */
module.exports.login = async function (req, res) {
  const { username, password } = req.body;
  /* Request parameters missing */
  if (!username || !password) {
    return res.status(STATUS_CODES.DATA_MISSING).send({
      status: "Failed",
      message: "Username and password is required",
    });
  }

  try {
    const doctor = await Doctor.findOne({ username });
    if (!doctor || doctor.password != password) {
      /* Registration failed if username already exists */
      return res.status(409).send({
        status: "Failed",
        message: "Invalid username/password",
      });
    }

    const token = generateToken(doctor);
    return res.status(STATUS_CODES.CREATED).send({
      status: "Success",
      token,
      message: "Doctor registered sucessfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(STATUS_CODES.SERVER_ERROR).send({
      status: "Success",
      message: "Server error",
    });
  }
};
