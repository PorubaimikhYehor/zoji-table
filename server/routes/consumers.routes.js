var express = require('express');
var router = express.Router();
// const controllers = require('../controllers/consumers.controller')

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const consumerScheme = new Schema({
  name: String,
  code: String,

})
const Model = mongoose.model("consumer", consumerScheme);

const sendError = (response, error) => {
  response.status(500).send({
    message: error.message || "Some error occurred while retrieving blanks."
  })
}

router.get('/', (req, res, next) => {
  console.log(req.query)
  const skip = +req.query.skip || 0;
  const limit = +req.query.limit || -1;
  const sort = +req.query.sort || "name";
  const search = +req.query.search || "";

  Model.find({}).sort(sort)
    .then(d => {
      const count = d.length;
      const data = d.slice(skip, skip + limit)
      
      res.send(data)
      // res.send({ data, count, skip, limit, sort, search })
    })
    .catch(e => sendError(res, e))
});

module.exports = router;