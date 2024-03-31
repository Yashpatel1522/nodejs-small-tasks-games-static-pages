const express=require('express');
const fun = require('../../models/deli-search/string');
const fun2 = require('../../models/deli-search/concat');
const database = require('../../models/ajax-insert-update-form/database');




const getDeli=(async(req,res)=>{
    var db=new database(process.env.database);


    try{
            var con=async()=>
            {
                var fire=await db.connect();
            }
    
            var data=async()=>
            {

                var result=await db.executrquery("select * from stdatt_student_master");
                var arr=Object.keys(result[0])
                res.render("deli-search/page1.ejs",{data:result,fields:arr,error:false});
            }
            data();

        }   
    catch(err){

        res.render("deli-search/page1.ejs",{data:false,fields:false,error:err});
        }

})
const postDeli=(async(req,res)=>{
    var str=req.body.query;
    var count=0;
    var obj=fun(str);

    var q=`select * from stdatt_student_master where `
    
    var std=fun2(obj.std_id,'std_id');
    if(std!="")
    {   
        if(count>0)
        {
            q+=' AND ';
        }
        count++;
        q+=std;
    }
    var fname=fun2(obj.first_name,'first_name');
    if(fname!="")
    {   
        if(count>0)
        {
            q+=' AND ';
        }
        count++;
        q+=fname;
    }

    var lname=fun2(obj.last_name,'last_name');
    if(lname!="")
    {   
        if(count>0)
        {
            q+=' AND ';
        }
        count++;
        q+=lname;
    }
    var contact=fun2(obj.contact,'contact');
    if(contact!="")
    {   
        if(count>0)
        {
            q+=' AND ';
        }
        count++;
        q+=contact;
    }
    var gender=fun2(obj.gender,'gender');
    if(gender!="")
    {   
        if(count>0)
        {
            q+=' AND ';
        }
        count++;
        q+=gender;
    }
    console.log(q);
    var db=new database(process.env.database);


    try{
            var data=async()=>
            {

                var result2=await db.executrquery(q);
                var arr2=Object.keys(result2[0])
                res.render("deli-search/page1.ejs",{data:result2,fields:arr2,error:false});
            }
            data();

        }   
    catch(err){

        res.render("deli-search/page1.ejs",{data:false,fields:false,error:err});
        }

})


module.exports={getDeli,postDeli};