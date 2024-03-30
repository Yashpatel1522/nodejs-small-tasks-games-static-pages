
const express = require('express');
const getSearch = require('../../controllers/perticular-search-and-or/search');
// const { getUser, getOrderBy } = require('../../controllers/pagination-orderby/pagination');
const andorsearch = express.Router();


andorsearch.get('/',getSearch)


module.exports=andorsearch;

