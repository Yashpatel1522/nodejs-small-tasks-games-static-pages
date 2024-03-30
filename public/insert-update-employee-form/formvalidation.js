const req=(arr)=>{
    for(var i=0;i<arr.length;i++)
    {
        if(document.getElementById(arr[i]).value=="")
        {
            return arr[i]
        }
    }
    return true;
}
const checkednum=(arr)=>{
    
    for(var i=0;i<arr.length;i++)
    {
        if(!isNaN(Number(document.getElementById(arr[i]).value)))
        {
            return arr[i]
        }
    }
    return true;
}

const rg=(id,type)=>{
    let CONTACT = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    let DATE =/\d{4}-\d{2}-\d{2}/
    let YEAR=/(?:(?:19|20)[0-9]{2})/;
    let PER=/(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/;
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
        case 'date':
            if(!document.getElementById(id).value.match(DATE))
            {
                return id;
            }     
            break;
        case 'year':
            if(!document.getElementById(id).value.match(YEAR))
            {
                return id;
            }     
            break;
        case 'per':
        if(!document.getElementById(id).value.match(PER))
        {
            return id;
        }     
        break;
    }
    return true;
}
const arrayreqvalid=(arr)=>{
        for(var i=0;i<arr.length;i++)
        {
            let obj=arr[i];
            let count=0;
            let inputs=document.getElementsByName(obj.name);
            for(var j=0;j<inputs.length;j++)
            {
                if(obj.type=='text')
                {
                    if(inputs[j].value !="")
                    {
                        count++;
                    }
                }
                else
                {
                    if(inputs[j].checked==true)
                    {
                        count++;
                    }

                }
            }
            // console.log(count); 
            // console.log(obj.size);

            if(obj.required==true && count>=obj.size)
            {
                continue;
            }
            else if(obj.required==false && (count==0 || count>=obj.size)) 
            {
                continue;
            }
            else
            {
                return obj;
            }

        }
        return true;
}
const fun=()=>{
    var ids=['firstname','lastname','designation','address1','email','address2','p_number','city','zipcode','dob','sscboard','sscpassingyear','sscper','hscboard','hscpassingyear','hscper','ugcname','uguni','ugpassingyear','ugper','ectc','cctc'];    
    var ans=req(ids);

    if(ans==true)
    {
        var arr2=['firstname','lastname','designation','address1','address2','city','sscboard','hscboard','ugcname','uguni'];
        var res2=checkednum(arr2)
        if(res2!=true)
        {
            document.getElementById('print-err').innerHTML=`Enter valid value ${res2}`;
            document.getElementById(res2).focus();
            return false ; 
        }
        
        if( rg('email','email')=="email")
        {
            document.getElementById('print-err').innerHTML=`Enter valid Email`;
            document.getElementById(rg('email','email')).focus();
            return false ; 
        }
        if( rg('p_number','mobile')=="p_number")
        {
            document.getElementById('print-err').innerHTML=`Enter valid Phone number`;return false ; 
        }
        if( rg('dob','date')=="dob")
        {
            document.getElementById('print-err').innerHTML=`Enter valid Birth date`;return false ; 
        }
        
        if( rg('sscpassingyear','year')=="sscpassingyear")
        {
            document.getElementById('print-err').innerHTML=`Enter valid SSC passing year`;return false ; 
        }
        if( rg('hscpassingyear','year')=="hscpassingyear")
        {
            document.getElementById('print-err').innerHTML=`Enter valid HSC passing year`;return false ; 
        }
        
        if( rg('sscper','per')=="sscper")
        {
            document.getElementById('print-err').innerHTML=`Enter valid SSC percentage`;return false ; 
        }
        if( rg('hscper','per')=="hscper")
        {
            document.getElementById('print-err').innerHTML=`Enter valid HSC percentage`;return false ; 
        }

           

        if( rg('ugpassingyear','year')=="ugpassingyear")
        {
            document.getElementById('print-err').innerHTML=`Enter valid UG passing year`;return false ; 
        }
        
        if( rg('ugper','per')=="ugper")
        {
            document.getElementById('print-err').innerHTML=`Enter valid UG percentage`;return false ; 
        }

       if(document.getElementById('male').checked==false && document.getElementById('female').checked==false )
       {
            document.getElementById('print-err').innerHTML=`Select value for gender`; return false ;
       } 
        var obj=[
            {
            name:'pg',
            label:'PG',
            required:false,
            type:'text',
            size:'4'
        },
        {
            name:'work1',
            label:'work-1',
            required:false,
            type:'select',
            size:'4'
        },
        {
            name:'work2',
            label:'work-2',
            required:false,
            type:'select',
            size:'4'
        },
        {
            name:'work3',
            label:'work-3',
            required:false,
            type:'select',
            size:'4'
        },
        {
            name:'hindi',
            label:'HINDI',
            required:false,
            type:'select',
            size:'2'
        },
        {
            name:'english',
            label:'ENGLISH',
            required:false,
            type:'select',
            size:'2'
        },
        {
            name:'gujrati',
            label:'GUJRATI',
            required:false,
            type:'select',
            size:'2'
        },
        {
            name:'php',
            label:'PHP',
            required:false,
            type:'select',
            size:'2'
        },
        {
            name:'mysql',
            label:'MYSQL',
            required:false,
            type:'select',
            size:'2'
        },
        {
            name:'laravel',
            label:'LARAVEl',
            required:false,
            type:'select',
            size:'2'
        },
        {
            name:'oracle',
            label:'ORACLE',
            required:false,
            type:'select',
            size:'2'
        },
        {
            name:'pre1',
            label:'PREFRENCES-1',
            required:false,
            type:'text',
            size:'3'
        },
        {
            name:'pre2',
            label:'PREFRENCES-2',
            required:false,
            type:'text',
            size:'3'
        }
        ]  
        var obj2=arrayreqvalid(obj);
        if(arrayreqvalid(obj)!=true)
        {
            document.getElementById('print-err').innerHTML=`Enter value for ${obj2.label}`; return false ; 
        }
        return true;
    }
    else
    {
        document.getElementById('print-err').innerHTML=`Enter value for ${ans}`; return false ; 
    }

}