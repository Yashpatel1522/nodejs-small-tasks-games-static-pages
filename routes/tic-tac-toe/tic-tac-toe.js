const express = require('express');
const getTicTacToeGame = require('../../controllers/tic-tac-toe/tic-tac-toe');
const tic_tac_toe = express.Router();


tic_tac_toe.get('/',getTicTacToeGame)

module.exports=tic_tac_toe;

