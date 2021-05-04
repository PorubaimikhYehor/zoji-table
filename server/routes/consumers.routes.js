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
  console.log('asdfqwer')
  Model.find()
    .then(data => res.send(data))
    .catch(e => sendError(res, e))
});

module.exports = router;