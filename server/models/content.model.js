const mariadb = require('./mariadb');

const Content = (content) => {
  id = content.id;
  parentId = content.parentId;
  // originalname = content.originalname;
  // encoding = content.encoding;
  // mimetype = content.mimetype;
  // filename = content.filename;
  // path = content.path;
  // size = content.size;
};

Content.getAll = async (result) => {
  let err = null;
  const contents = await mariadb.pool.query('SELECT * from content')
    .catch(e => err = e);
  let sqlReq = '';
  contents.length && contents.map(c => sqlReq += `select * from contentFiles where contentId = ${c.id};`);
  sqlReq += 'select languageId from contentFiles';
  const files = sqlReq ? await mariadb.pool.query(sqlReq).catch(e => err = e) : null;
  contents.map((t, key) => t['files'] = files[key]);
  result(err, err ? null : contents)
};

Content.addOne = (content, result) => {
  let err = null;
  const sqlStrData = [
    content.name,
    content.parentId,
    content.isUsedDefault,
    content.orderNumber
  ];
  const sqlStr = 'INSERT INTO content (name, parentId, isUsedDefault, orderNumber) VALUES (?, ?, ?, ?); SELECT * FROM content ORDER BY ID DESC LIMIT 1;';
  mariadb.pool.query(sqlStr, sqlStrData)
    .then(res => result(null, res[1][0]))
    .catch(err => result(err, null))
};

Content.updateOne = (content, result) => {  
  const sqlStrData = [
    content.name,
    content.parentId,
    content.isUsedDefault,
    content.id,
    content.id,
  ];
  const sqlStr = `UPDATE content SET name=?, parentId=?, isUsedDefault=? where id = ?;SELECT * FROM content where id = ?;`;
  mariadb.pool.query(sqlStr, sqlStrData)
    .then(res => result(null, content))
    .catch(err => result(err, null))
};


Content.deleteOne = (id, result) => {
  mariadb.pool.query(`delete from content where id = ${id}; `)
    .then(res => result(null, res))
    .catch(err => result(err, null))
};

Content.updateOrder = (body, result) => {
  // console.log(body);
  let sqlStr = "";
  body.map(b => sqlStr += ` UPDATE content SET orderNumber=${b.orderNumber} where id=${b.id};`);
  console.log(sqlStr  );
  mariadb.pool.query(sqlStr)
    .then(res => result(null, res))
    .catch(err => result(err, null))
}



// Content.getAll = result => {
//   sql.connection.query('SELECT * from content', (err, res) => {
//     result(err, err ? null : res);
//   });
// };

// Content.getBlanksByTemplateId = (templateId, result) => {
//   sql.connection.query(`select templateId, languageId, fileName from blanks where templateId = ${templateId}`,
//     (err, res) => result(err, err ? null : res)
//   )
// };

Content.downloadFile = (contentId, languageId, result) => {
  mariadb.pool.query(`select * from contentFiles where contentId = ${contentId} and languageId = ${languageId}`)
    .then(res => result(null, res[0]))
    .catch(err => result(err, null))
}

Content.addFile = (file, result) => {
  const sqlStrData = [
    file.contentId,
    file.languageId,
    file.originalname,
    file.encoding,
    file.mimetype,
    file.filename,
    file.path,
    file.size,
  ];
  const sqlStr = 'INSERT INTO contentFiles (contentId, languageId, originalname, encoding, mimetype, filename, path, size) VALUES (?,?,?,?,?,?,?,?);'
  mariadb.pool.query(sqlStr, sqlStrData)
    .then(res => result(null, res))
    .catch(err => result(err, null))
};


Content.updateBlank = (blank, result) => {
  // const sqlStrData = [blank.fileName, blank.fileData, blank.templateId, blank.languageId];
  const sqlStrData = [
    blank.originalname,
    blank.encoding,
    blank.mimetype,
    blank.filename,
    blank.path,
    blank.size,
    blank.contentId,
    blank.languageId,
  ];
  const sqlStr = 'UPDATE contentFiles SET originalname=?, encoding=?, mimetype=?, filename=?, path=?, size=? where contentId = ? and languageId = ?;'
  mariadb.pool.query(sqlStr, sqlStrData)
    .then(res => result(null, res))
    .catch(err => result(err, null))
};


Content.deleteFile = (file, result) => {
  console.log(file)
  mariadb.pool.query(`delete from contentFiles where contentId = ${file.contentId} and languageId = ${file.languageId};`)
    .then(res => result(null, res))
    .catch(err => result(err, null))
};

module.exports = Content
