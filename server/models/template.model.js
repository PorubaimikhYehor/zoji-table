const mariadb = require('./mariadb');

const Template = (template) => {
  id = template.id;
  name = template.name;
  description = template.description;
  blanks = template.blanks;
};

Template.getAll = async (result) => {
  let err = null;
  const templates = await mariadb.pool.query('SELECT * from templates')
    .catch(e => err = e);
  let sqlReq = '';
  // templates.length && templates.map(t => sqlReq += `select templateId, languageId, originalname from blanks where templateId = ${t.id};`);
  templates.length && templates.map(t => sqlReq += `select * from blanks where templateId = ${t.id};`);
  sqlReq += 'select templateId from blanks';
  const blanks = sqlReq ? await mariadb.pool.query(sqlReq).catch(e => err = e) : null;
  templates.map((t, key) => t['blanks'] = blanks[key]);
  result(err, err ? null : templates)
};

Template.updateTemplate = (template, result) => {
  const sqlStrData = [template.name, template.description, template.id, template.id]
  const sqlStr = 'UPDATE templates SET name = ?, description = ? WHERE (id = ?);SELECT * FROM templates where id = ?;'
  mariadb.pool.query(sqlStr, sqlStrData)
    .then(res => result(null, res[1][0]))
    .catch(err => result(err, null))
};

Template.deleteOne = (id, result) => {
  mariadb.pool.query(`delete from templates where id = ${id};`)
    .then(res => result(null, res))
    .catch(err => result(err, null))
};

Template.addOne = (template, result) => {
  let err = null;
  const sqlStrData = [
    template.name,
    template.description,
  ];
  const sqlStr = 'INSERT INTO templates (name, description) VALUES (?, ?); SELECT * FROM templates ORDER BY ID DESC LIMIT 1;';
  mariadb.pool.query(sqlStr, sqlStrData)
    .then(res => result(null, res[1][0]))
    .catch(e => err = e);
};

module.exports = Template
