const express = require('express');
const getAttendance = require('../../controllers/student-attendance/student');
const getatt = express.Router();


getatt.get('/',getAttendance)

module.exports=getatt;
