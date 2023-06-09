const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  phone_number: {
    type: String,
    required: true,
  },
});

const Patient = mongoose.model("Patient", PatientSchema);

module.exports = Patient;
