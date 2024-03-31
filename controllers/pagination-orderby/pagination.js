const express=require('express')
const router=express.Router();
const mysql=require('mysql');
const database = require('../../models/ajax-insert-update-form/database');


const getUser=(async(req,res)=>{
    const con=new database(process.env.database)

    var page=JSON.parse(req.params.page);
    var data_per_page=10;
    var total_record=200;
    var start=(data_per_page)*(page-1);
       
    var q=`select * from student limit ${data_per_page} offset ${start}`;
    
    var result=await con.executrquery(q);

    if(typeof result=="string")
    {
        console.log(result)
    }
    else
    {
        res.render('pagination-orderby/page.ejs',{pageno:page,res1:result,totalrec:total_record,direction:false}); 
    }
    
})
const getOrderBy=(async(req,res)=>{
        var con=new database(process.env.database)

        var page=JSON.parse(req.params.page);
        var first_name=req.params.first_name;
        var direction=req.params.order;
        console.log(first_name);
        var data_per_page=10;
        var total_record=200;
        var start=(data_per_page)*(page-1);
        
        var q=`select * from student order by ${first_name} ${direction} limit ${data_per_page} offset ${start} `;

        var result=await con.executrquery(q)
        if(typeof result=="string")
        {
            console.log(result)
        }
        else
        {
            res.render('pagination-orderby/page.ejs',{pageno:page,res1:result,totalrec:total_record,direction:direction}); 
        }
})

module.exports={getUser,getOrderBy};