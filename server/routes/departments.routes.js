var express = require('express');
var router = express.Router();
// const controllers = require('../controllers/consumers.controller')

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const scheme = new Schema({
  name: String,
  regions: Array,
})
const Model = mongoose.model("departments", scheme);

const sendError = (response, error) => {
  response.status(500).send({
    message: error.message || "Some error occurred while retrieving blanks."
  })
}

router.get('/', async (req, res, next) => {
  const data = await Model.find(req.query).catch(e => sendError(res, e))
  res.send(data)
});

module.exports = router;