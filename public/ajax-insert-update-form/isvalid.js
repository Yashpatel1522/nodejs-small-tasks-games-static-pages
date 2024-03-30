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
const checkdynemicbox=(arr)=>{
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@")
    console.log(arr)
    for(var i=0;i<arr.length;i++)
    {
        var obj=arr[i];
        console.log(obj)
        var result=[];
        obj.data.forEach(element =>{
                element=document.getElementsByName(element);
                let row=[]
                element.forEach(single=>{
                    if(single.value!="")
                    {
                        row.push(single.value)
                    }
                })
                result.push(row);
        })
        console.log("mmMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMmm")
        console.log(result)
        let size=result[0].length;
        for(let i=0;i<result.length;i++)
        {
            if(size!=result[i].length)
            {
                return obj;
            }
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

const isvalid_baisicdetails=(container)=>
{
    var arr=['first_name','last_name','designation','email','phone_no','birthdate','city','address1','address2']
    var ans=req(arr)
    if(ans==true)
    {
        var checknum=['first_name','last_name','designation','address1','address2','city']
        var checksumans=checkednum(checknum);
        if(checksumans!=true)
        {
            document.getElementById('print-err').style.display='block';
            document.getElementById('print-err').innerHTML=`Enter valid value ${checksumans}`;
            document.getElementById(checksumans).focus();
            return false ;
        }
        if(document.getElementById('male').checked==false && document.getElementById('female').checked==false )
        {
            document.getElementById('print-err').style.display='block';
            document.getElementById('print-err').innerHTML=`Select value for gender`; 
            return false ;
        } 
        if(rg('email','email')=="email")
        {
            document.getElementById('print-err').style.display='block';
            document.getElementById('print-err').innerHTML=`Enter valid Email`;
            document.getElementById(rg('email','email')).focus();
            return false ; 
        }
        if( rg('phone_no','mobile')=="phone_no")
        {
            document.getElementById('print-err').style.display='block';
            document.getElementById('print-err').innerHTML=`Enter valid Phone number`;
            document.getElementById(rg('phone_no','mobile')).focus();
            return false ; 
        }
        if( rg('birthdate','date')=="birthdate")
        {
            document.getElementById('print-err').style.display='block';
            document.getElementById('print-err').innerHTML=`Enter valid Birth date`;
            document.getElementById(rg('birthdate','date')).focus();
            return false ; 
        }
    }
    else
    {
        document.getElementById('print-err').style.display='block';
        document.getElementById(ans).focus();
        document.getElementById('print-err').innerHTML=`Enter value for ${ans}`; return false ; 
    }
    return true;
}

const isvalid_education=(container)=>{
    var obj=[{
        label:'education',
        data:['course','board','passing_year','percentage'],
        required:false
    }]
    if(checkdynemicbox(obj)!=true)
    {   
        document.getElementById('print-err').style.display='block';
        document.getElementById('print-err').innerHTML=`Enter value for ${checkdynemicbox(obj).label}`; 
        return false ;      
    }   
}
const isvalid_work=(container)=>{
    var obj=[{
        label:'work',
        data:['company_name','work_designation','from_date','to_date'],
        required:false
    }]
    console.log("ajkdjhfgauikshfskajdghauihknjskdhj")
    console.log(obj)
    if(checkdynemicbox(obj)!=true)
    {   
        document.getElementById('print-err').style.display='block';
        document.getElementById('print-err').innerHTML=`Enter value for ${checkdynemicbox(obj).label}`; 
        return false ;      
    }   
}
const isvalid_ref=()=>{
    var obj=[{
        label:'Refrences',
        data:['name','contact','relation'],
        required:false
    }]
    if(checkdynemicbox(obj)!=true)
    {   
        document.getElementById('print-err').style.display='block';
        document.getElementById('print-err').innerHTML=`Enter value for ${checkdynemicbox(obj).label}`; 
        return false ;      
    }   
}
const isvalid_language=()=>{

  var obj=[
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
    },]
    var obj2=arrayreqvalid(obj);
    if(arrayreqvalid(obj)!=true)
    {
        document.getElementById('print-err').style.display='block';
        document.getElementById('print-err').innerHTML=`Enter value for ${obj2.label}`; 
        return false ; 
    }
}
const isvalid_tech=()=>{
    obj=[
        {
            name:'php',
            label:'PHP',
            required:false,
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
            size:'2'
        },
        {
            name:'oracle',
            label:'ORACLE',
            required:false,
            size:'2'
        },
    ]
    var obj2=arrayreqvalid(obj);
    if(arrayreqvalid(obj)!=true)
    {
        document.getElementById('print-err').style.display='block';
        document.getElementById('print-err').innerHTML=`Enter value for ${obj2.label}`; 
        return false ; 
    }
}
const isvalid_last=()=>{
    var arr=['prefered_location','expected_ctc','department']
    var ans=req(arr)
    if(ans!=true)
    {
        document.getElementById('print-err').style.display='block';
        document.getElementById(ans).focus();
        document.getElementById('print-err').innerHTML=`Enter value for ${ans}`; return false ; 
    }

}