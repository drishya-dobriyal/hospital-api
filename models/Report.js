const mongoose = require("mongoose");

/* Create Report */
const ReportSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  status: {
    type: String,
    enum: [
      "Negative",
      "Travelled-Quarantine",
      "Symptoms-Quarantine",
      "Positive-Admit",
    ],
    validate: {
      validator: function (value) {
        return [
          "Negative",
          "Travelled-Quarantine",
          "Symptoms-Quarantine",
          "Positive-Admit",
        ].includes(value);
      },
      message: "Invalid status value",
    },
  },

  date: {
    type: Date,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
});

const Report = mongoose.model("Report", ReportSchema);

module.exports = Report;
