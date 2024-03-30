const express = require('express');
const getSortingInt = require('../../controllers/sorting-int-char-string/sorting');
const sorting_Int = express.Router();


sorting_Int.get('/',getSortingInt)

module.exports=sorting_Int;

