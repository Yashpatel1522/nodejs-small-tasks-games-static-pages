const express = require('express');
const getTimeZone = require('../../controllers/time-zone/time-zone');
const timezone = express.Router();


timezone.get('/',getTimeZone)

module.exports=timezone;

