const express = require('express');
const getDynemicTable = require('../../controllers/dynemic-table/dynemic-table');
const dynemic_table = express.Router();


dynemic_table.get('/',getDynemicTable)

module.exports=dynemic_table;

