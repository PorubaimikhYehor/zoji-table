const Model = require('../models/content.model');

exports.getAll = (req, res) => {
  Model.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving blanks."
      });
    else res.send(data);
  });
}
