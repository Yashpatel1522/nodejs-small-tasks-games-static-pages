const md5 = require('md5');
const jwt=require('jsonwebtoken');
const randomnum = require('../../models/main-login-project/user');
const database = require('../../models/ajax-insert-update-form/database');



const getRegForm=((req,res)=>{
    res.render("main-login-project/regform.ejs")
})

const postUser=(async(req,res)=>{
    var data=req.body
    // console.log(data)
    var db=new database(process.env.database);
    var result=await db.executrquery(`select * from users where email='${data.email}' or phone_no='${data.phone_no}'`)
   
    if(typeof(result)=="string")
    {
        res.send({
            msg:'ERROR: Somthing is Wrong Please Restart Application...',
            flag:false

        })
    }
    console.log(result)
    if(result.length>0)
    {   
        if(result[0].status=="inActive")
        {
            await db.delete('users',{activation_code:result[0].activation_code})
        }
        else
        {     
            return res.send({
                msg:'ERROR: Enter Unique Mobile number or Email',
                flag:false
            })
        }
    }

    // if(result.length==0)
    // {
        var activationcode=randomnum(12);
        
        var obj={
            first_name:data.first_name,
            last_name:data.last_name,
            email:data.email,
            phone_no:data.phone_no,
            activation_code:activationcode,
          }  
        var result=await db.insertdata(obj,"users")
        
        var urllink=`http://localhost:8000/main-login-project/user/${activationcode}`;
        if(typeof(result)=="string")
        {
            res.send({
                msg:result,
                flag:false
            })
        }
        else
        {
            res.send({
                msg:urllink,
                flag:true
            })
        }        
    // }
    
    
})

const getUserActivation=async(req,res)=>{
    db=new database(process.env.database);
    var result=await db.executrquery(`select create_time from users where activation_code='${req.params.activationcode}'`)
    // console.log(result)
    
    var currdate=new Date();
    if(result.length>0)
    {
        var olddate=new Date(result[0].create_time);
        var check=((currdate-olddate)/10000).toString().split('.')
        // console.log(check[0])
        if(check[0]>1)
        {
            var result2=await db.delete('users',{activation_code:req.params.activationcode});
            // console.log(result);
            res.render('main-login-project/error.ejs');
        }
        else
        {
            res.render("main-login-project/activation.ejs")
        }
    }
    else
    {
        res.render('main-login-project/error.ejs');
    }
    
}

const postUserActivation=(async(req,res)=>{
    var data=req.body;

    if(data.password!="")
    {
        var db=new database(process.env.database);
        var result=await db.update({status:'Active'},'users',{activation_code:req.params.activationcode})
        console.log(result)
        if(result.changedRows>0)
        {
            var salt=randomnum(4);
            data.password=data.password+salt;
            var result=await db.update({password:md5(data.password),salt:salt},'users',{activation_code:req.params.activationcode})
            var r=await db.update({activation_code:null},'users',{activation_code:req.params.activationcode})

            res.send(
                {
                    msg:`http://localhost:8000/main-login-project/login`,
                    flag:true
                }
            )
        }    
    }
    else
    {
        res.send(
            {
                msg:'password is empty',
                flag:false
            }
        )
    }

})

const getDataActivation=(async(req,res)=>{
    var db=new database(process.env.database);
    var result=await db.executrquery(`select email from users where activation_code='${req.params.activationcode}'`)
    res.send(result);
})
const getLogin=((req,res)=>{
    res.render("main-login-project/login.ejs")
})

const postLogin=(async(req,res)=>{

    var db=new database(process.env.database)
    // console.log(`select * from users where email='${req.body.emaillogin}' or phone_no='${req.body.emaillogin}'`)
    var result=await db.executrquery(`select * from users where email='${req.body.emaillogin}' or phone_no='${req.body.emaillogin}'`)
    if(result.length==0)
    {
        res.send(
            {
                msg:'invalid Creadentials',
                flag:false
            }
        )
    }
    if(result.length>0)
    {
        var newpass=md5(req.body.passwordlogin+result[0].salt);
        if(newpass==result[0].password)
        {
            var token=jwt.sign(
                {id:result[0].id},
                process.env.SECRET_KEY,
                {expiresIn:'1h'} 
            )
            res.cookie('token',token).json({id:result[0].id,flag:true});
        }
        else
        {
            res.send({
                msg:'invalid credentials',
                flag:false
            })
        }
    }

})


const getForget=('/forget',(req,res)=>{
    res.render("main-login-project/forget.ejs")
})
const postForget=('/forget',async(req,res)=>{
    var data=req.body;
    var db=new database(process.env.database)
    var currtime=new Date();
    // console.log(`${currtime.getFullYear()}-${currtime.getMonth()}-${currtime.getDate()} ${currtime.getHours()}:${+currtime.getMinutes()}:${currtime.getSeconds()}`)
   
    
    var result=await db.executrquery(`select * from users where (phone_no="${data.forget}" or email="${data.forget}") and status="Active"`)
    // console.log(result);

    if(typeof(result)=="string")
    {
        res.send({
            msg:'ERROR: Somthing is Wrong Please Restart Application...',
            flag:false
        })
    }
    if(result.length>0)
    {
        var r=await db.executrquery(`update users set for_forgot=CURRENT_TIMESTAMP where phone_no='${data.forget}' or email='${data.forget}'`)
        // var r=await db.update2({for_forgot:`${currtime.getFullYear()}-${currtime.getMonth()}-${currtime.getDate()} ${currtime.getHours()}:${+currtime.getMinutes()}:${currtime.getSeconds()}`},'users',{phone_no:`${data.forget}`,email:`${data.forget}`})
        var activationcode=randomnum(12);
        console.log(activationcode)
        var urllink=`http://localhost:8000/main-login-project/forget/${activationcode}`;
        var result=await db.update2({activation_code:activationcode},'users',{phone_no:data.forget,email:data.forget})
        console.log(result);
        if(typeof(result)=="string")
        {
            res.send({
                msg:result,
                flag:false
            })
        }
        else
        {
            res.send({
                msg:urllink,
                flag:true
            })
        }
    }
    else
    {
        var result=await db.executrquery(`select * from users where (phone_no="${data.forget}" or email="${data.forget}")`)
        if(result.length>0)
        {
            res.send({
                msg:'ERROR: Account inActive Reregister',
                flag:false
            })
        }
        else
        {
            res.send({
                msg:'ERROR: Invalid Creadentials...',
                flag:false
            })
        }
        
    }
})  


const getForgetActivation=(async(req,res)=>{
    console.log(req.params.activationcode)
    db=new database(process.env.database);
    var result=await db.executrquery(`select for_forgot from users where activation_code='${req.params.activationcode}'`)

    console.log(result)
    
    var currdate=new Date();
    // console.log("]]]]]]]]]]]]]]]]]]]]]]")
    // console.log(result)
    if(result.length>0)
    {
        var olddate=new Date(result[0].for_forgot);
        // console.log(olddate)
        var check=((currdate-olddate)/10000).toString().split('.')
        // console.log(check)
       
        if(check[0]>1)
        {
            var result2=await db.update({activation_code:null},'users',{activation_code:req.params.activationcode});
            // console.log(result);
            res.render('main-login-project/error.ejs');
        }
        else
        {
            res.render("main-login-project/newpassword.ejs");
        }
    }
    else
    {
        res.render('main-login-project/error.ejs');
    }
})

const postForgetActivation=(async(req,res)=>{
    var data=req.body
    if(data.password!="")
    {

            var salt=randomnum(4);
            data.password=data.password+salt;
            var result=await db.update({password:md5(data.password),salt:salt},'users',{activation_code:req.params.activationcode})
            var r=await db.update({activation_code:null},'users',{activation_code:req.params.activationcode})

            res.send(
                {
                    msg:`http://localhost:8000/main-login-project/login`,
                    flag:true
                }
            )       
    }
    else
    {
        res.send(
            {
                msg:'password is empty',
                flag:false
            }
        )
    }


})
const getDashboardUserId=((req,res)=>{
    // console.log(req.cookies)
    res.render('main-login-project/home.ejs')
})

const getWelcome=(req,res)=>{
    res.render('main-login-project/dashboard.ejs')
}
const getLogout=(req,res)=>{
    var token=req.cookies.token
    res.clearCookie("token").redirect("/main-login-project/login")
}

const getMenu=(req,res)=>{
    res.render("main-login-project/menu.ejs");
}

const getHome=(req,res)=>{
    res.render("main-login-project/home.ejs");
}
module.exports={getRegForm,getUserActivation,postUser,postUserActivation,getDataActivation,getLogin,postLogin,getForget,postForget,getForgetActivation,postForgetActivation,getDashboardUserId,getLogout,getMenu,getHome,getWelcome}