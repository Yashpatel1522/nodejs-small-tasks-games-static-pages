const express=require('express')
const router=express.Router();
const mysql=require('mysql');


const getUser=((req,res)=>{
    var con=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"Root@123",
        database:"combinedtasks"
    });
    con.connect((err)=>{
        if(err)console.log(err)
        console.log("conected....");

        var page=JSON.parse(req.params.page);
        var data_per_page=10;
        var total_record=200;
        var start=(data_per_page)*(page-1);
        
        

        var q=`select * from student limit ${data_per_page} offset ${start}`;

        var mypromise=new Promise((resolve,reject)=>{
            con.query(q,(result,err)=>{
                if(err) reject(err);
                else
                {
                    resolve(result);
                }
            })
        })
        mypromise.then((err)=>{
            console.log(err);

        }).catch((res1)=>{
            console.log("res1");
            res.render('pagination-orderby/page.ejs',{pageno:page,res1:res1,totalrec:total_record,direction:false}); 
        })

 })

})
const getOrderBy=((req,res)=>{


    var con=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"Root@123",
        database:"combinedtasks"
    });
    
    con.connect((err)=>{
        if(err)console.log(err)
        console.log("conected....");

        var page=JSON.parse(req.params.page);
        var first_name=req.params.first_name;
        var direction=req.params.order;
        console.log(first_name);
        var data_per_page=10;
        var total_record=200;
        var start=(data_per_page)*(page-1);
        
        

        var q=`select * from student order by ${first_name} ${direction} limit ${data_per_page} offset ${start} `;

        var mypromise=new Promise((resolve,reject)=>{
            con.query(q,(result,err)=>{
                if(err) reject(err);
                else
                {
                    resolve(result);
                }
            })
        })
        if(direction=='asc')
        {
            direction="Ascending";
        }
        else
        {
            direction="descending";
        }
        mypromise.then((err)=>{
            console.log(err);

        }).catch((res1)=>{
            console.log("res1");
            res.render('pagination-orderby/page.ejs',{pageno:page,res1:res1,totalrec:total_record,direction:direction}); 
        })

 })


})

module.exports={getUser,getOrderBy};