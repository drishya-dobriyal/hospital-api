/* Home */
module.exports.home = function (req, res) {
  res.status(200).send({
    message: "Welcome to Hopital",
    status: "Sucess",
  });
};
