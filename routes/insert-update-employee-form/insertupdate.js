const express = require('express');
const { getInsert, postInsert,getData, getUpdate, postUpdate, getbasicdetailsdata, display, getDelete } = require('../../controllers/insert-update-employee-form/insertupdate');
const simpleinsertupdate = express.Router();


simpleinsertupdate.get('/',getInsert)
simpleinsertupdate.post('/',postInsert)

simpleinsertupdate.get("/data/:id",getData)

simpleinsertupdate.get('/update/:id',getUpdate)
simpleinsertupdate.post('/update/:id',postUpdate)

simpleinsertupdate.get('/data',getbasicdetailsdata)

simpleinsertupdate.get("/display", display);    

simpleinsertupdate.get("/delete/:id",getDelete)

module.exports=simpleinsertupdate;

