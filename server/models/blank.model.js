const mariadb = require('./mariadb');

const Blank = (blank) => {
  templateId = blank.templateId;
  languageId = blank.languageId;
  originalname = blank.originalname;
  encoding = blank.encoding;
  mimetype = blank.mimetype;
  filename = blank.filename;
  path = blank.path;
  size = blank.size;
};

Blank.getAll = result => {
  mariadb.pool.query('SELECT * from blanks')
    .then(res => result(null, res))
    .catch(err => result(err, null))
};

Blank.getBlanksByTemplateId = (templateId, result) => {
  mariadb.pool.query(`select templateId, languageId, fileName from blanks where templateId = ${templateId}`)
    .then(res => result(null, res))
    .catch(err => result(err, null))
};

Blank.getBlank = (templateId, languageId, result) => {
  mariadb.pool.query(`select * from blanks where templateId = ${templateId} and languageId = ${languageId}`)
    .then(res => result(null, res[0]))
    .catch(err => result(err, null))
}

Blank.addBlank = async (blank, result) => {
  const sqlStrData = [
    blank.templateId,
    blank.languageId,
    blank.originalname,
    blank.encoding,
    blank.mimetype,
    blank.filename,
    blank.path,
    blank.size,
  ];
  const sqlStr = 'INSERT INTO blanks (templateId, languageId, originalname, encoding, mimetype, filename, path, size) VALUES (?,?,?,?,?,?,?,?);'
  mariadb.pool.query(sqlStr, sqlStrData)
    .then(res => result(null, res))
    .catch(err => result(err, null))
};


Blank.updateBlank = async (blank, result) => {
  // const sqlStrData = [blank.fileName, blank.fileData, blank.templateId, blank.languageId];
  const sqlStrData = [
    blank.originalname,
    blank.encoding,
    blank.mimetype,
    blank.filename,
    blank.path,
    blank.size,
    blank.templateId,
    blank.languageId,
  ];

  const sqlStr = 'UPDATE blanks SET originalname=?, encoding=?, mimetype=?, filename=?, path=?, size=? where templateId = ? and languageId = ?;'
  mariadb.pool.query(sqlStr, sqlStrData,)
    .then(res => result(null, res))
    .catch(err => result(err, null))
};


Blank.deleteBlank = async (blank, result) => {
  mariadb.pool.query(`delete from blanks where templateId = ${blank.templateId} and languageId = ${blank.languageId};`)
    .then(res => result(null, res))
    .catch(err => result(err, null))
};

module.exports = Blank
