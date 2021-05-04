const Model = require('../models/template.model');

exports.findAll = (req, res) => {
  Model.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving templates."
      });
    else res.send(data);
  });
}
exports.addOne = (req, res) => {
  // Validate request
  const { name } = req.body;
  if (!(name)) {
    res.status(400).send({
      message: "Content is invalid!"
    });
    return;
  }
  Model.addOne(req.body, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding company entity info."
      });
    else res.send(data);
  });
}

exports.updateTemplate = (req, res) => {
  // Validate request
  const template = req.body.template;
  if (!template) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Model.updateTemplate(template, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating template."
      });
    else res.send(data);
  });
}

exports.deleteOne = (req, res) => {
  // Validate request
  const id = req.params.id;
  if (!id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  Model.deleteOne(id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting template."
      });
    else res.send({});
  });
}

