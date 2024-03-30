const forgeteer=async()=>{
    if(document.getElementById('forget').value=="")
    {       if(document.getElementById('forget').nextSibling)
            {
                document.getElementById('forget').nextSibling.remove()
            }
            nodes=document.getElementById("forget");
            var p=document.createElement('p');
            p.className='text-danger'
            p.innerHTML="please enter email or password";
            nodes.insertAdjacentElement("afterend", p);
    }
    else
    {   
        if(document.getElementById('forget').nextSibling)
        {
            document.getElementById('forget').nextSibling.remove()
        }
        const form=document.getElementById('form_fr')
        var data=new URLSearchParams(new FormData(form))
        var url=`http://localhost:8000/main-login-project/forget`
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
                   },1000);

                document.getElementById('print-err').style.display='block'
                document.getElementById('print-err').className='middle alert alert-success'
                document.getElementById('print-err').innerHTML=`<a href=${res.msg} class='alert-link'>${res.msg}</a>`;
            }   
    }
}