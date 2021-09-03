var express = require('express');
var router = express.Router();
var user = require('./user');
var content = require('./content');
var uploader = require('./uploader');
const config_data  =  require('../config/global_variables');
let basePath = config_data.basePath;

router.use(express.static(basePath));
router.use('/user', user);
router.use('/content', content);
router.use('/uploader', uploader);
module.exports = router;
