var express = require('express');
var router = express.Router();
// const controllers = require('../controllers/consumers.controller')

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userScheme = new Schema({

  firstName: String,
  secondName: String,
  login: String,
  email: String,
  isActive: Boolean,
  department: String,
})
const Model = mongoose.model("users", userScheme);

const sendError = (response, error) => {
  response.status(500).send({
    message: error.message || "Some error occurred while retrieving blanks."
  })
}

router.get('/', (req, res, next) => {
  // console.log(req.query)
  // const skip = +req.query.skip || 0;
  // const limit = +req.query.limit || -1;
  // const sort = +req.query.sort || "name";
  // const search = +req.query.search || "";

  Model.find({})
    // .sort(sort)
    .then(users => {
    //   const count = d.length;
    //   const consumers = d.slice(skip, skip + limit);
    //   const pagination = { count, skip, limit, sort, search }
      res.send({ users })
    })
    .catch(e => sendError(res, e))
});

module.exports = router;