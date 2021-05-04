const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
};

mongoose.connect('mongodb://localhost/zoji-table', options);

module.exports = mongoose;
