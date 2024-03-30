const express = require('express');
const getHtmlCss1 = require('../../controllers/html-css-1/1');
const htmlcss1 = express.Router();


htmlcss1.get('/',getHtmlCss1)

module.exports=htmlcss1;
