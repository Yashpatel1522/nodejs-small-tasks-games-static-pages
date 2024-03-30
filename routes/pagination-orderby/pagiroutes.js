

const express = require('express');
const { getUser, getOrderBy } = require('../../controllers/pagination-orderby/pagination');
const paginationorderby = express.Router();


paginationorderby.get('/users/:page',getUser)
paginationorderby.get('/users/:page/:first_name/:order',getOrderBy)


module.exports=paginationorderby;

