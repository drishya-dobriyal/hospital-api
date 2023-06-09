const mongoose = require("mongoose");

/* Create Doctor Schema */
const DoctorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Doctor = mongoose.model("Doctor", DoctorSchema);
module.exports = Doctor;
