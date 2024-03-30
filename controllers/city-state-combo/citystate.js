const express=require('express');
const database = require('../../models/city-state-combo/database');
// const database = require('./package/database');
const router=express.Router()

const getDemo=((req,res)=>{
    res.render('city-state-combo/demo.ejs')
})
const getState=(async(req,res)=>{
    var obj=new database('state');
    var ans=await obj.executrquery('select * from states');
    console.log(ans)
    res.send(ans);
})

const getCity=(async(req,res)=>{
    var obj=new database('state');
    var ans=await obj.executrquery('select * from cities');
    res.send(ans);
})
const getCityId=(async(req,res)=>{
    
    var obj=new database('state');
    var ans=await obj.executrquery(`select * from cities where state_id=${req.params.id}`);
    res.send(ans);
})

module.exports={getDemo,getState,getCity,getCityId}