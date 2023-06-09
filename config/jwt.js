const { STATUS_CODES } = require("../controllers/utils");
const jwt = require("jsonwebtoken");
const jwtKey = "hospital";

/* Generate JWT Token */
module.exports.generateToken = function (doctor) {
  const payload = { doctorId: doctor._id };
  return jwt.sign(payload, jwtKey, { expiresIn: "1h" });
};

/* Verify JWT Token */
module.exports.verifyToken = function (req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      status: "Failed",
      message: "Unauthorized",
    });
  }

  jwt.verify(token, jwtKey, (err, decoded) => {
    if (err) {
      return res
        .status(STATUS_CODES.UNAUTHORIZED)
        .json({ message: "Invalid token", status: "Failed" });
    }

    req.doctor = decoded;
    next();
  });
};
