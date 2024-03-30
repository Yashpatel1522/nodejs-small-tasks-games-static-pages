const { fileLoader } = require("ejs");


const required=(data,arr)=>{
    for(var i=0;i<arr.length;i++)
    {
        if(data[arr[i]]=="")
        {
            return arr[i]
        }
    }
    return true;
}
const checkednum=(arr,data)=>{
    
    for(var i=0;i<arr.length;i++)
    {
        if(!isNaN(Number(data[arr[i]])))
        {
            return arr[i]
        }
    }
    return true;
}
const arrayreqvalid=(obj1,data)=>{
    for(var i=0;i<obj1.length;i++)
    {
        console.log(obj1.length);
        let obj=obj1[i];
        let count=0;
        let inputs=data[obj.name];
        // console.log(inputs, obj.name)
        if(inputs !=undefined){
        for(var j=0;j<inputs.length;j++)
        {
            // console.log(inputs[j])
                if(inputs[j]!="")
                {
                    count++;
                }
        } }
        // console.log(obj.size);
        if(count==0)
        {
            data[obj.name]=null;
        }
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
    return {flag: true, data:data};
}
const rg=(id,type,data)=>{
    let CONTACT =new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)    
    let DATE =new RegExp(/\d{4}-\d{2}-\d{2}/)
    let YEAR=new RegExp(/(?:(?:19|20)[0-9]{2})/)
    let PER=new RegExp(/(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/)
    var EMAIL= new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

    switch(type)
    {
        case 'email':
            // console.log(data[id])
            if(!EMAIL.test(data[id]))
            {
                return id;
            }
            break;
        case 'mobile':
            if(!CONTACT.test(data[id]))
            {
                return id;
            }
            break;
        case 'date':
            if(!DATE.test(data[id]))
            {
                return id;
            }     
            break;
        case 'year':
            if(!YEAR.test(data[id]))
            {
                return id;
            }     
            break;
        case 'per':
            if(!PER.test(data[id]))
            {
                return id;
            }     
            break;
    }
    return true;
}

const serverside=((req,res,next)=>{
    data=req.body;
    console.log(data);    

    var fields=Object.keys(req.body);
    console.log(fields);    

    var ids=['firstname','lastname','designation','address1','email','address2','p_number','city','state','zipcode','gender','relation_op','dob','ectc','cctc','dept'];
    if(required(data,ids)==true)
    {
        var arr2=['firstname','lastname','designation','address1','address2','city'];
        var res2=checkednum(arr2,data)
        // console.log(res2);
        if(res2!=true)
        {
            res.render('form2.ejs',{err:res2})
        }

        if(rg('email','email',data)=="email")
        {
            res.render('form2.ejs',{err:'email'})
        }

        if( rg('pnumber','mobile',data)=="pnumber")
        {
            res.render('form2.ejs',{err:'Phone Number'})
        }

        if( rg('dob','date',data)=="dob")
        {
            res.render('form2.ejs',{err:'Date of Birth'})
        }

        var obj=[
            {
            name:'pg',
            label:'PG',
            required:false,
            size:'4'
        },
        {
            name:'work1',
            label:'work-1',
            required:false,
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
        {
            name:'pre1',
            label:'REFRENCES-1',
            required:false,
            size:'3'
        },
        {
            name:'pre2',
            label:'REFRENCES-2',
            required:false,
            size:'3'
        }
        ]  

        var ans=arrayreqvalid(obj,data);
        if(ans.flag==true)
        {
            data=ans.data;
            req.body=data;
        }
        else
        {
            res.render('form2.ejs',{err:ans.label})
        }
        next();
    }   
    else
    {
        res.render('form2.ejs',{err:required(data,ids)})
    }

})

module.exports=serverside;