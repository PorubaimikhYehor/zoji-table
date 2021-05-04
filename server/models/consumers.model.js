const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const consumerScheme = new Schema({
    // id: String,
    name: String,
    code: String,

})
const Consumer = mongoose.model("Consumer", consumerScheme);
 
Consumer.find({}, function(err, docs){
    mongoose.disconnect();     
    if(err) return console.log(err);     
    console.log(docs);
});


Content.getAll = async (result) => {
    //   let err = null;
    //   const contents = await mariadb.pool.query('SELECT * from content')
    //     .catch(e => err = e);
    //   let sqlReq = '';
    //   contents.length && contents.map(c => sqlReq += `select * from contentFiles where contentId = ${c.id};`);
    //   sqlReq += 'select languageId from contentFiles';
    //   const files = sqlReq ? await mariadb.pool.query(sqlReq).catch(e => err = e) : null;
    //   contents.map((t, key) => t['files'] = files[key]);
    //   result(err, err ? null : contents)
};
