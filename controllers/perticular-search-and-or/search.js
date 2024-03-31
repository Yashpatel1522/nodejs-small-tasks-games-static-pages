const express=require('express');
const database = require('../../models/ajax-insert-update-form/database');
const router=express.Router();


const getSearch=((req,res)=>{
    var db=new database(process.env.database);
    var onlyid=req.query.id2;
    var op=req.query.select;
    
    var std_id=req.query.std_id;
    var first_name=req.query.first_name;
    var last_name=req.query.last_name;
    var contact=req.query.contact;
    var email=req.query.email;
    var gender=req.query.gender;
    // var def=[]
    console.log(op);


    console.log();
    try{
            var data=async()=>
            {
                if(onlyid!=undefined)
                {
                    var result=await db.executrquery(`select * from stdatt_student_master where std_id=${onlyid}`);
                }
                else if(op=='and' && std_id!="" && first_name!="" && last_name!="" && contact!="" && email!="" && gender!="")
                {
                    var result=await db.executrquery(`select * from stdatt_student_master where std_id=${std_id} ${op} first_name='${first_name}' ${op} last_name='${last_name}' ${op} contact='${contact}' ${op} email='${email}' ${op} gender='${gender}'`);
                }
                else if(op=='or')
                {
                    var result=await db.executrquery(`select * from stdatt_student_master where std_id="${std_id}" ${op} first_name="${first_name}" ${op} last_name="${last_name}" ${op} contact="${contact}" ${op} email="${email}" ${op} gender="${gender}";`)
                }
                
                else
                {
                    var result=await db.executrquery("select * from stdatt_student_master");
                }
                var arr=Object.keys(result[0])
                res.render("perticular-search-and-or/page1.ejs",{data:result,fields:arr,error:false});
            }
            data();
        }   
    catch(err){
        res.render("perticular-search-and-or/page1.ejs",{data:false,fields:false,error:err});
        }

})


module.exports=getSearch;