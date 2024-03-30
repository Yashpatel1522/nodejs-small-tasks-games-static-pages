const express = require('express');
const getHtmlCss3 = require('../../controllers/html-css-3/3');
const htmlcss3 = express.Router();


htmlcss3.get('/',getHtmlCss3)

module.exports=htmlcss3;
