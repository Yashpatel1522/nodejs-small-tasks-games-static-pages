const express = require('express');
const getJsEvent = require('../../controllers/events-prac/event');
const jsevent = express.Router();


jsevent.get('/',getJsEvent)

module.exports=jsevent;
