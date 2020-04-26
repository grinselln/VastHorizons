var express = require('express');
var router = express.Router();
const session = require('express-session');
var db = require("../../models");
var helpers = require("../../helpers/island/island"); 

 router.route('/')
 .get(helpers.getIsland)
 .post(helpers.createIsland)
 .put(helpers.updateIsland); 

module.exports = router;