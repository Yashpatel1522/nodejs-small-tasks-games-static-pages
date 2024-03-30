const express = require('express');
const getHtmlCss2 = require('../../controllers/html-css-2/2');
const htmlcss2 = express.Router();


htmlcss2.get('/',getHtmlCss2)

module.exports=htmlcss2;
