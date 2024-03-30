const express=require('express');
const router=express.Router()


const getmain=((req,res)=>{
    res.render('json-placeholder/viewapidata.ejs');
})

const getPostId1=((req,res)=>{
    res.render('json-placeholder/postdetails.ejs');
})


module.exports={getmain,getPostId1};