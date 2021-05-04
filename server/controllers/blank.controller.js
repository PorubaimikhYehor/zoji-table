const Blank = require('../models/blank.model');

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


exports.findBlanksByTemplateId = (req, res) => {
  // Validate request
  const templateId = +req.query.templateId;
  if (!templateId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  Blank.getBlanksByTemplateId(templateId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving blanks."
      });
    else res.send(data);
  });
}
exports.downloadBlank = (req, res) => {
  const { templateId, languageId } = req.query;
  if (!(templateId && languageId)) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  Blank.getBlank(templateId, languageId, (err, data) => {
    if (err) return res.status(500).send({ message: err.message || "Some error occurred while retrieving blank." });
    else res.download(data.path, data.originalname, (err) => err && res.end({}));
  });

}

exports.findBlank = (req, res) => {
  // Validate request
  const { templateId, languageId } = req.query;
  if (!(templateId && languageId)) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  Blank.getBlank(templateId, languageId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving blank."
      });
    else res.send(data);
  });
}

exports.addBlank = (req, res) => {
  // Validate request
  const blank = {
    templateId: req.body.templateId,
    languageId: req.body.languageId,
    originalname: req.file.originalname,
    encoding: req.file.encoding,
    mimetype: req.file.mimetype,
    filename: req.file.filename,
    path: req.file.path,
    size: req.file.size,
  };
  if (Object.values(blank).filter(v => !v).length) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  Blank.addBlank(blank, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding blank."
      });
    else res.send({});
  });
}

exports.updateBlank = (req, res) => {
  // Validate request
  const blank = {
    templateId: req.body.templateId,
    languageId: req.body.languageId,
    originalname: req.file.originalname,
    encoding: req.file.encoding,
    mimetype: req.file.mimetype,
    filename: req.file.filename,
    path: req.file.path,
    size: req.file.size,
  };
  if (Object.values(blank).filter(v => !v).length) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  Blank.updateBlank(blank, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating blank."
      });
    else res.send({});
  });
}

exports.deleteBlank = (req, res) => {
  // Validate request
  const blank = {}
  blank.languageId = +req.body.languageId;
  blank.templateId = +req.body.templateId;
  if (!blank.languageId || !blank.templateId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  Blank.deleteBlank(blank, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting blank."
      });
    else res.send({});
  });
}
