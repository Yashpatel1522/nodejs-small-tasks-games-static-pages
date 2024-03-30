const express = require('express');
const { getResId, getResult } = require('../../controllers/student-result/student');
const studentresult = express.Router();


studentresult.get('/',getResult)
studentresult.get('/res/:id',getResId)

module.exports=studentresult;
