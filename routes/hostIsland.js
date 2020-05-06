var express = require('express');
var router = express.Router();
const session = require('express-session');
var db = require("../models");
var helpers = require("../helpers/hostIsland"); 

 router.route('/')
 .get(helpers.testHostIsland)
 .post(helpers.createHostIsland)

module.exports = router;