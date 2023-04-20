'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    console.log('init')
    res.send('respond with a sankar');
});

module.exports = router;
