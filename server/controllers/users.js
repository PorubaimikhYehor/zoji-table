const Users = require('../models/blank.model');

exports.findAll = (req, res) => {
  Blank.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving blanks."
      });
    else res.send(data);
  });
}
