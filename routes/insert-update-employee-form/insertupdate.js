const express = require('express');
const { getInsert, postInsert,getData, getUpdate, postUpdate } = require('../../controllers/insert-update-employee-form/insertupdate');
const simpleinsertupdate = express.Router();


simpleinsertupdate.get('/',getInsert)
simpleinsertupdate.post('/',postInsert)

simpleinsertupdate.get("/data/:id",getData)

simpleinsertupdate.get('/update/:id',getUpdate)
simpleinsertupdate.post('/update/:id',postUpdate)


module.exports=simpleinsertupdate;

