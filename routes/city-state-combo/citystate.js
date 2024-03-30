const express = require('express');
const { getDemo, getState, getCity, getCityId } = require('../../controllers/city-state-combo/citystate');
const citystate = express.Router();


citystate.get('/demo',getDemo)

citystate.get('/state',getState)
citystate.get('/city',getCity)

citystate.get('/city/:id',getCityId)




module.exports=citystate;
