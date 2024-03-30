// const express=require('express')
const jwt=require('jsonwebtoken');


const checkToken=(req,res,next)=>{
    if(req.cookies.token!=undefined)
    {
        var token=req.cookies.token
        var id=req.params.userid
        const decode=jwt.verify(token,process.env.SECRET_KEY)
        if(decode.id==id)
        {
            next()
        }
        else
        {
            res.render("main-login-project/login.ejs")
        }
    }
    else
    {
        res.render("main-login-project/login.ejs")
    }
      
}

module.exports=checkToken