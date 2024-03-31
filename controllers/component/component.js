const express=require('express');
const fun = require('../../models/component/fun');
const database = require('../../models/ajax-insert-update-form/database');
const router=express.Router();


const getComponent=(async(req,response)=>{
    var db=new database(process.env.database);
    
    var name=req.query.query;

    var res3=await db.executrquery(`select * from select_master join option_master on select_master.select_key=option_master.select_key where select_name='${name}'`);
    if(name==undefined)
    {
        response.render('component/details.ejs',{data:false});
    }
    else
    {
        response.render('component/details.ejs',{data:res3});
    }
})

module.exports=getComponent;  