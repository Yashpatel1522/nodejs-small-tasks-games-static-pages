const express=require('express');
// const dbconnection = require('./package/dbconnection');
// const fun = require('./package/fun');
const dbconnection = require('../../models/component/dbconnection');
const fun = require('../../models/component/fun');
const router=express.Router();


const getComponent=(async(req,response)=>{
    var db=new dbconnection('combinedtasks');
    // var res=await db.executequery('select * from option_master');
    // var res2=await db.executequery('select * from select_master');
    // console.log(res);
    // console.log(res2);
    
    var name=req.query.query;

    // var obj=fun(res,res2,name);
    var res3=await db.executequery(`select * from select_master join option_master on select_master.select_key=option_master.select_key where select_name='${name}'`);
    console.log(`select * from select_master join option_master on select_master.select_key=option_master.select_key where select_name="${name}"`);
    console.log(res3);
    // console.log(obj);
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