const mariadb = require('./mariadb');


const Language = (language) => {
  // this.id = language.id;
  this.isActive = language.isActive;
  this.isoName = language.isoName;
  this.iso_639_1 = language.iso_639_1;
  this.iso_639_2b = language.iso_639_2b;
  this.iso_639_2t = language.iso_639_2t;
  this.iso_639_3 = language.iso_639_3;
  this.nativeName = language.nativeName;
  this.notes = language.notes;
}

Language.getAll = result => {
  mariadb.pool.query('SELECT id, isoName, nativeName, iso_639_1, isActive from languages')
    .then(res => result(null, res))
    .catch(err => result(err, null))
};

Language.getActive = result => {
  mariadb.pool.query('SELECT id, isoName, nativeName, iso_639_1, isActive from languages where isActive = 1')
    .then(res => result(null, res))
    .catch(err => result(err, null))
};


Language.toggleActive = async (id, result) => {
  console.log('Language.toggleActive')
  let err = null;
  const isActives = await mariadb.pool.query(`select isActive from languages where id = ?;`, [id])
    .catch(e => err = e);
  if (!err) {
    if (!isActives[0].isActive) {
      await mariadb.pool.query(`UPDATE languages SET isActive = 1 WHERE id = ?;`, [id])
        .catch(e => err = e);
    } else {
      const blanks = await mariadb.pool.query(`SELECT languageId FROM document_creator.blanks Where languageId = ?;`, [id])
        .catch(e => err = e);
      if (blanks.length) {
        err = { message: "You cannot disable this language. You use it in some templates." }
      } else {
        await mariadb.pool.query(`UPDATE languages SET isActive = 0 WHERE id = ?;`, [id])
          .catch(e => err = e);
      }
    }
  }
  result(err, err ? null : isActives[0].isActive)
};


module.exports = Language;
