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