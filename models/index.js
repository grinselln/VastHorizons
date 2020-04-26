var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://127.0.0.1:27017/vh', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.Promise = Promise;

module.exports.User = require("./user");
module.exports.Island = require("./island");