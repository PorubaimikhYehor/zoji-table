const Language = require('../models/language.model')

exports.findAll = (req, res) => {
  Language.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving languages."
      });
    else res.send(data);
  });
};

exports.toggleActive = (req, res) => {
  // Validate request
  const id = req.body.id;
  if (!id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  Language.toggleActive(id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while toggle Active prop in language"
      });
    else res.send({});
  });
};

exports.findActive = (req, res) => {
  Language.getActive((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving languages."
      });
    else res.send(data);
  });
};

