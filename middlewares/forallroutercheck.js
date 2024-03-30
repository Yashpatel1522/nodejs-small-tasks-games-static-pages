const jwt=require('jsonwebtoken');


const forallcheckToken=(req,res,next)=>{
    if(req.cookies.token!=undefined)
    {
        var token=req.cookies.token
        const decode=jwt.verify(token,process.env.SECRET_KEY)
        if(decode.id!="")
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

module.exports=forallcheckToken