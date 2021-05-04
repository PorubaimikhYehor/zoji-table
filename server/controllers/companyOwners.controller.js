const Model = require('../models/companyOwners.model');
const CompanyOwner = require('../models/companyOwners.model');

exports.findAll = (req, res) => {
  Model.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving company owners info."
      });
    else res.send(data);
  });
}

exports.addOne = (req, res) => {
  // Validate request
  const { name, lastName, phone, email } = req.body;
  if (!(name && lastName && phone && email)) {
    res.status(400).send({
      message: "Content is invalid!"
    });
    return;
  }
  Model.addOne(req.body, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding company owner info."
      });
    else res.send(data);
  });
}

exports.updateOne = (req, res) => {
  // Validate request
  const id = req.params.id;
  const { name, lastName, phone, email } = req.body;
  if (!(name && lastName && phone && email && id)) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const companyOwner = { ...req.body, id: req.params.id }
  Model.updateOne(companyOwner, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating company owner info."
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
          err.message || "Some error occurred while deleting company owner info."
      });
    else res.send({});
  });
}
