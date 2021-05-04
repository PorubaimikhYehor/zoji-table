const mariadb = require('./mariadb');

const CompanyOwner = (companyOwner) => {
  id = companyOwner.id;
  name = companyOwner.name;
  lastName = companyOwner.lastName;
  phone = companyOwner.phone;
  email = companyOwner.email;
};

CompanyOwner.getAll = result => {
  mariadb.pool.query('SELECT * from companyOwners')
    .then(res => result(null, res))
    .catch(err => result(err, null))
};

CompanyOwner.addOne = async (companyOwner, result) => {
  const sqlStrData = [
    companyOwner.name,
    companyOwner.lastName,
    companyOwner.phone,
    companyOwner.email,
  ];
  const sqlStr = 'INSERT INTO companyOwners (name, lastName, phone, email) VALUES (?, ?, ?, ?); SELECT * FROM companyOwners ORDER BY ID DESC LIMIT 1;';
  mariadb.pool.query(sqlStr, sqlStrData)
    .then(res => result(null, res[1][0]))
    .catch(err => result(err, null))
};

CompanyOwner.updateOne = async (companyOwner, result) => {
  const sqlStrData = [
    companyOwner.name,
    companyOwner.lastName,
    companyOwner.phone,
    companyOwner.email,
    companyOwner.id,
    companyOwner.id,
  ];
  const sqlStr = `
  UPDATE companyOwners SET name=?, lastName=?, phone=?, email=? where id = ?;
  SELECT * FROM companyOwners where id = ?;
  `;
  mariadb.pool.query(sqlStr, sqlStrData)
    .then(res => result(null, res[1][0]))
    .catch(err => result(err, null))
};

CompanyOwner.deleteOne = (id, result) => {
  mariadb.pool.query(`delete from companyOwners where id = ${id};`)
    .then(res => result(null, res))
    .catch(err => result(err, null))
};

module.exports = CompanyOwner
