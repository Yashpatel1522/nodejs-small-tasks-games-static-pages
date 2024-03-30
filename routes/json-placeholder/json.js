const express = require('express');
const { getmain, getPostId1 } = require("../../controllers/json-placeholder/json");
const jsonapi = express.Router();


jsonapi.get('/',getmain)
jsonapi.get('/post-details/:id',getPostId1)


module.exports=jsonapi;

