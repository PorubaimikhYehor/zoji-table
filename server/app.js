var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var consumersRouter = require('./routes/consumers.routes');

const locations = require('../config/locations.config');
var cors = require('cors');


var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/consumers', consumersRouter);

// ---- SERVE STATIC FILES ---- //
app.get('*.*', express.static(locations.client, {maxAge: '1y'}));

// ---- SERVE APLICATION PATHS ---- //
app.get('/*', (req, res) => {  
  res.status(200).sendFile(`/`, {root: locations.client});
});

module.exports = app;
