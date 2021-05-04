const Model = require('../models/content.model');

exports.findAll = (req, res) => {
  console.log('content');

  Model.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving blanks."
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
          err.message || "Some error occurred while adding content."
      });
    else res.send(data);
  });
}

exports.updateOne = (req, res) => {
  // Validate request
  const id = req.params.id;
  const { name, parentId } = req.body;
  if (!(name)) {
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
          err.message || "Some error occurred while deleting template."
      });
    else res.send({});
  });
}
exports.updateOrder = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  Model.updateOrder(req.body, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating order."
      });
    else res.send({});
  })

}

// === FILE ACTIONS ===
exports.downloadFile = (req, res) => {
  const { contentId, languageId } = req.query;
  if (!(contentId && languageId)) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  Model.downloadFile(contentId, languageId, (err, data) => {
    console.log(data);

    if (err) return res.status(500).send({
      message: err.message || "Some error occurred while retrieving blank."
    });
    // else res.send(data);
    else res.download(data.path, data.originalname, (err) => err && res.end({}));
  });
}

exports.addFile = (req, res) => {
  // Validate request
  const file = {
    contentId: req.body.contentId,
    languageId: req.body.languageId,
    originalname: req.file.originalname,
    encoding: req.file.encoding,
    mimetype: req.file.mimetype,
    filename: req.file.filename,
    path: req.file.path,
    size: req.file.size,
  };
  if (Object.values(file).filter(v => !v).length) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  Model.addFile(file, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding blank."
      });
    else res.send({});
  });
}

exports.updateFile = (req, res) => {
  // Validate request
  const file = {
    contentId: req.body.contentId,
    languageId: req.body.languageId,
    originalname: req.file.originalname,
    encoding: req.file.encoding,
    mimetype: req.file.mimetype,
    filename: req.file.filename,
    path: req.file.path,
    size: req.file.size,
  };
  if (Object.values(file).filter(v => !v).length) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  Model.updateBlank(file, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating blank."
      });
    else res.send({});
  });
}

exports.deleteFile = (req, res) => {
  // Validate request
  const file = {}
  file.languageId = +req.body.languageId;
  file.contentId = +req.body.contentId;
  if (!file.languageId || !file.contentId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  Model.deleteFile(file, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting blank."
      });
    else res.send({});
  });
}
