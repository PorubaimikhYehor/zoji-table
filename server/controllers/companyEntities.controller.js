const Model = require('../models/companyEntities.model');

exports.findAll = (req, res) => {
  Model.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving company entities info."
      });
    else res.send(data);
  });
}

exports.addOne = (req, res) => {
  // Validate request
  const { name, address, phone, email } = req.body;
  if (!(name && address && phone && email)) {
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

exports.updateOne = (req, res) => {
  // Validate request
  const id = req.params.id;
  const { name, address, phone, email } = req.body;
  if (!(name && address && phone && email && id)) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  Model.updateOne(id, req.body, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating company entity info."
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
          err.message || "Some error occurred while deleting company entity info."
      });
    else res.send({});
  });
}
