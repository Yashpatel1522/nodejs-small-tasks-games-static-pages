const express = require('express');
const getComponent = require('../../controllers/component/component');
const checkToken = require('../../middlewares/login-main-project');
const component= express.Router();


component.get('/',getComponent)

module.exports=component;

