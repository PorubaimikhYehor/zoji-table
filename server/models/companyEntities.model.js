const mariadb = require('./mariadb');

const CompanyEntity = (companyEntity) => {
  id = companyEntity.id;
  title = companyEntity.title;
  name = companyEntity.name;
  address = companyEntity.address;
  phone = companyEntity.phone;
  fax = companyEntity.fax;
  email = companyEntity.email;
  description = companyEntity.description;
};

CompanyEntity.getAll = result => {
  mariadb.pool.query('SELECT * from companyEntities')
    .then(res => result(null, res))
    .catch(err => result(err, null))
};

CompanyEntity.addOne = async (companyEntity, result) => {
  const sqlStrData = [
    companyEntity.name,
    companyEntity.title,
    companyEntity.address,
    companyEntity.phone,
    companyEntity.fax,
    companyEntity.email,
    companyEntity.description
  ];
  const sqlStr = 'INSERT INTO companyEntities (name, title, address, phone, fax, email, description) VALUES (?, ?, ?, ?, ?, ?, ?); SELECT * FROM companyEntities ORDER BY ID DESC LIMIT 1;';
  mariadb.pool.query(sqlStr, sqlStrData)
    .then(res => result(null, res[1][0]))
    .catch(err => result(err, null))
};

CompanyEntity.updateOne = async (id, companyEntity, result) => {
  const sqlStrData = [
    companyEntity.name,
    companyEntity.title,
    companyEntity.address,
    companyEntity.phone,
    companyEntity.fax,
    companyEntity.email,
    companyEntity.description,
    id,
    id,
  ];
  const sqlStr = `
  UPDATE companyEntities SET name=?, title=?, address=?, phone=?, fax=?, email=?, description=? where id = ?;
  SELECT * FROM companyEntities where id = ?;
  `;
  mariadb.pool.query(sqlStr, sqlStrData)
    .then(res => result(null, res[1][0]))
    .catch(err => result(err, null))
};

CompanyEntity.deleteOne = (id, result) => {
  mariadb.pool.query(`delete from companyEntities where id = ${id};`)
    .then(res => result(null, res))
    .catch(err => result(err, null))
};

module.exports = CompanyEntity
