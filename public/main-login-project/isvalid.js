const req=(arr)=>{
    var res=[];
    for(var i=0;i<arr.length;i++)
    {
        if(document.getElementById(arr[i]).nextSibling)
        {
            document.getElementById(arr[i]).nextSibling.remove()
        }
        if(document.getElementById(arr[i]).value=="")
        {
            res.push(arr[i]);
        }
    }
    return res;
}
const rg=(id,type)=>{
    let CONTACT = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    var EMAIL= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    switch(type)
    {
        case 'email':
            if(!document.getElementById(id).value.match(EMAIL))
            {
                return id;
            }
            break;
        case 'mobile':
            if(!document.getElementById(id).value.match(CONTACT))
            {
                return id;
            }
            break;
    }
    return true;
}

const isvalid=(arr)=>{
    
    var res=req(arr);
    if(res.length>0)
    {
        for(var i=0;i<res.length;i++)
        {
            nodes=document.getElementById(res[i]);
            var p=document.createElement('p');
            p.className='text-danger'
            p.innerHTML=`Enter value For ${res[i]}`;
            nodes.insertAdjacentElement("afterend", p);
        }
        return false;
    }
    else
    {
        return true
    }
    
}

let time = 0;
const passdata=async()=>{
    arr=['first_name','last_name','email','phone_no'];
    if(isvalid(arr)==true)
    {   
    
        var arr2=[];
        if(rg('email','email')=="email")
        { 
            arr2.push(rg('email','email'));
        }
        if( rg('phone_no','mobile')=="phone_no")
        {
            arr2.push(rg('phone_no','mobile')) 
        }
        
        if(arr2.length>0)
        {
            for(var i=0;i<arr2.length;i++)
            {
                nodes=document.getElementById(arr2[i]);
                var p=document.createElement('p');
                p.className='text-danger'
                p.innerHTML=`Enter value For ${arr2[i]}`;
                nodes.insertAdjacentElement("afterend", p);
            }
            return false;
        }
        else
        {
            const form=document.getElementById('form-1')
            var data=new URLSearchParams(new FormData(form))
            var url='http://localhost:8000/main-login-project/user'
            var res=await fetch(url,{
                method:'POST',
                body:data,
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
            });
            res=await res.json();
            console.log(res);
            if(res.flag==false)
            {
                document.getElementById('print-err').style.display='block'
                document.getElementById('print-err').innerHTML=res.msg;
            }
            else
            {
                const disptime = document.getElementById("time");
                disptime.style.display = "block";
                console.log(disptime);

                let incomeTicker=20;
                window.setInterval(function(){
                    if (incomeTicker > 0)
                        incomeTicker--;
                        disptime.innerHTML=incomeTicker;
                   }, 1000);

                document.getElementById('print-err').style.display='block'
                document.getElementById('print-err').className='middle alert alert-success'
                document.getElementById('print-err').innerHTML=`<a href=${res.msg} class='alert-link'>${res.msg}</a>`;
            }
        }

    }
    else
    {
        return false;
    }
}   

const updatedata=async()=>{
    var activationcode=window.location.href.split('/').pop();

    

    arr=['password','re_password']
    if(isvalid(arr))
    {   

        if((document.getElementById('password').value)!=(document.getElementById('re_password').value))
        {
            as.popup({
                title: "Opps !",
                text: "password dosen't match",
                icon: "error"
                });
                return false;
        }
        console.log(document.getElementById('password').value)
        if(!(document.getElementById('password').value.toString().length>=8) && !(document.getElementById('password').value.toString().length>=8))
        {
            as.popup({
                title: "Opps !",
                text: "password size minimum 8",
                icon: "error"
                });
                return false;
        }
        
        
        const form=document.getElementById('form-2')
        var data=new URLSearchParams(new FormData(form))
        var url=`http://localhost:8000/main-login-project/user/${activationcode}`
        var res=await fetch(url,{
            method:'POST',
            body:data,
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
        });
        res=await res.json();
        if(res.flag==false)
        {
            document.getElementById('print-err-2').style.display='block'

            document.getElementById('print-err-2').innerHTML=res.msg;
        }
        else
        {
            as.popup({
                title: "Account Activated...!",
                closeBtn: false,
                buttons: [
                      {html: "Close",type:"success",click: function(){window.location=res.msg}},
                    ]
              });   
        }
    }
    else
    {
        return false;
    }

}
const newpassword=async()=>{
    var activationcode=window.location.href.split('/').pop();

    arr=['password','re_password']
    if(isvalid(arr))
    {   

        if((document.getElementById('password').value)!=(document.getElementById('re_password').value))
        {
            as.popup({
                title: "Opps !",
                text: "password dosen't match",
                icon: "error"
                });
                return false;
        }
        console.log(document.getElementById('password').value)
        if(!(document.getElementById('password').value.toString().length>=8) && !(document.getElementById('password').value.toString().length>=8))
        {
            as.popup({
                title: "Opps !",
                text: "password size minimum 8",
                icon: "error"
                });
                return false;
        }
        
        
        const form=document.getElementById('form-rg')
        var data=new URLSearchParams(new FormData(form))
        var url=`http://localhost:8000/main-login-project/forget/${activationcode}`
        var res=await fetch(url,{
            method:'POST',
            body:data,
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
        });
        res=await res.json();
        if(res.flag==false)
        {
            document.getElementById('print-err-2').style.display='block'

            document.getElementById('print-err-2').innerHTML=res.msg;
        }
        else
        {
            as.popup({
                title: "Password Change...!",
                closeBtn: false,
                buttons: [
                      {html: "Close",type:"success",click: function(){window.location=res.msg}},
                    ]
              });   
        }
    }
    else
    {
        return false;
    }


}
const login=async()=>{
    
    const form=document.getElementById('login')
    var data=new URLSearchParams(new FormData(form))
    var url='http://localhost:8000/main-login-project/login'
    var res=await fetch(url,{   
        method:'post',
        body:data,
        headers:{
            'content-type':'application/x-www-form-urlencoded'
        }  
    })
    res=await res.json();
    if(res.flag==false)
        {
            document.getElementById('print-err-2').style.display='block'
            document.getElementById('print-err-2').innerHTML=res.msg;
        }
        else
        {
            location.href=`/main-login-project/dashboard/${res.id}` 
        }    
}