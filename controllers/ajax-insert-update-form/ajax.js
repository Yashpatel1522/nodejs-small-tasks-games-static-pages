const express=require('express');
const database = require('../../models/ajax-insert-update-form/database');
// const database = require('./package/database');
const router=express.Router()

const getForm=((req,res)=>{
    res.render('ajax-insert-update-form/form.ejs',{id:false})
})

const postForm=(async(req,res)=>{
    var data=req.body;
   var db=new database(process.env.database)
//    console.log(data)
   obj={
    first_name:data.first_name,
    last_name: data.last_name,
    designation:data.designation,
    email:data.email,
    phone_no:data.phone_no,
    gender:data.gender,
    relationship:data.relationship,
    birthdate:data.birthdate,
    state:data.state,
    city:data.city,
    address:JSON.stringify(data.address),
    prefered_location:JSON.stringify(data.prefered_location),
    notice_period:data.notice_period!=""?data.notice_period:0,
    expected_ctc:data.expected_ctc,
    current_ctc:data.current_ctc!=""?data.current_ctc:0,
    department:data.department
   }
   var resset=await db.insertdata(obj,'candidate_masters');
//    console.log(resset)
//    console.log(resset);
   var lastid=resset.insertId;

   if(data.course!=undefined)
   {
        if(typeof(data.course)=="string")
        {
            var obj2={
                candidate_id:lastid,
                course:data.course,
                board:data.board,
                passing_year:data.passing_year,
                percentage:data.percentage,
            }
            db.insertdata(obj2,'education_details');
        } 
        else
        {
            for(var i=0;i<data.course.length;i++)
            {
                 var obj2={
                     candidate_id:lastid,
                     course:data.course[i],
                     board:data.board[i],
                     passing_year:data.passing_year[i],
                     percentage:data.percentage[i],
                 }
                 db.insertdata(obj2,'education_details');
             }
        }
   }

    if(data.company_name!=undefined)
    {
        if(typeof(data.company_name)=="string")
        {
            var obj2={
                candidate_id:lastid,
                company_name:data.company_name,
                work_designation:data.work_designation,
                from_date:data.from_date,
                to_date:data.to_date,
            }
            db.insertdata(obj2,'work_experiences2');
        }
        else
        {
            for(var i=0;i<data.company_name.length;i++)
             {
             var obj2={
                 candidate_id:lastid,
                 company_name:data.company_name[i],
                 work_designation:data.work_designation[i],
                 from_date:data.from_date[i],
                 to_date:data.to_date[i],
             }
             db.insertdata(obj2,'work_experiences2');
            }
        }
        
    }
    var language=[]
                                
   if(data.gujrati!=undefined)
   {
        language.push(data.gujrati);
   }
   if(data.hindi!=undefined)
   {
        language.push(data.hindi);
   }
   if(data.english!=undefined)
   {
        language.push(data.english);
   }
    obj={}
    
    for(var i=0;i<language.length;i++)
    {
        var arr=language[i]
        obj.candidate_id=lastid,
        obj.language=arr[0];
        arr=arr.slice(1)
        obj.language_lvl=JSON.stringify(arr);    
        db.insertdata(obj,'languages');
    }

    var tech=[]
    if(data.php!=undefined)
    {
        tech.push(data.php)
    }
    if(data.mysql!=undefined)
    {
        tech.push(data.mysql)
    }
    if(data.oracle!=undefined)
    {
        tech.push(data.oracle)
    }
    if(data.laravel!=undefined)
    {
        tech.push(data.laravel)
    }
    obj={}
    for(var i=0;i<tech.length;i++)
    {
        var arr=tech[i];
        obj.candidate_id=lastid
        obj.technology=arr[0]
        obj.technology_lvl=JSON.stringify([arr[1]])
        db.insertdata(obj,'technologies');

    }
    if(data.name!=undefined)
    {
        if(typeof(data.name)=='string')
        {
            var obj2={
                candidate_id:lastid,
                name:data.name,
                contact:data.contact,
                relation:data.relation
            }
            db.insertdata(obj2,'reference_contacts');
        }
        else
        {
            for(var i=0;i<data.name.length;i++)
            {
                var obj2={
                    candidate_id:lastid,
                    name:data.name[i],
                    contact:data.contact[i],
                    relation:data.relation[i]
                }
                db.insertdata(obj2,'reference_contacts');
            }
        }
        
    }
   
})
const getData=(async(req,res)=>{
    var db=new database(process.env.database)
    var res2=await db.executrquery("select id,first_name,last_name,email,phone_no,gender from candidate_masters");
    res.send(res2);
})


const getDisplay=(async(req,res)=>{
    res.render('ajax-insert-update-form/gridpage.ejs')
})

const getDeleteId=(async(req,res)=>{
    id=req.params.id
    // console.log(id)
    var db=new database(process.env.database);
    db.delete('education_details',{candidate_id:id})
    db.delete('languages',{candidate_id:id})
    db.delete('reference_contacts',{candidate_id:id})
    db.delete('work_experiences2',{candidate_id:id})
    db.delete('technologies',{candidate_id:id})
    db.delete('candidate_masters',{id:id})
    res.redirect("/ajax-form/display")
})

const getDataId=(async(req,res)=>{
   
    var id=req.params.id
    var db=new database(process.env.database)
    var candidate_masters=await db.executrquery(`select * from candidate_masters where id=${id}`);

    // console.log(candidate_masters);

    var education_details=await db.executrquery(`select course,board,passing_year,percentage from education_details where candidate_id=${id}`);
    // console.log(education_details)
    var languages=await db.executrquery(`select language,language_lvl from languages where candidate_id=${id}`);
    languages.forEach(element => {
            element["language_lvl"]=JSON.parse(element["language_lvl"]);
    });
    var technologies=await db.executrquery(`select technology,technology_lvl from technologies where candidate_id=${id}`);
    // console.log(technologies)
    technologies.forEach(element => {
        // console.log(element["technology_lvl"])
        element["technology_lvl"]=JSON.parse(element["technology_lvl"]);
});
    var reference_contacts=await db.executrquery(`select name,contact,relation from reference_contacts where candidate_id=${id}`);
    var work_experiences=await db.executrquery(`select company_name,work_designation,from_date,to_date from work_experiences2 where candidate_id=${id}`);
    
    
    
    var obj={
        candidate_masters:candidate_masters.length<=0?null:candidate_masters,
        education_details:education_details.length<=0?null:education_details,
        languages:languages.length<=0?null:languages,
        technologies:technologies.length<=0?null:technologies,
        reference_contacts:reference_contacts.length<=0?null:reference_contacts,
        work_experiences:work_experiences.length<=0?null:work_experiences,
    }
    res.send(obj)
})

const getUpdateId=((req,res)=>{
    var id=req.params.id 
    // console.log(id)
    res.render('ajax-insert-update-form/form.ejs',{id:id}); 
})

const postUpdateId=(async(req,response)=>{
    var data=req.body;
    var  keys=Object.keys(data)
    keys.forEach(key=>{
        if(data[key].length==0)
        {
            data[key]=null;
        }
    })
    var arr=["course","board","passing_year","percentage","compny_name","work_designation","from_date","to_date","name","contact","relation"]
    arr.forEach(key=>{
        if(typeof(data[key])=="string")
        {
            data[key]=[data[key]]
        }
    })
    console.log(data)
    var db=new database(process.env.database);
   

    obj={
            first_name:data.first_name,
            last_name: data.last_name,
            designation:data.designation,
            email:data.email,
            phone_no:data.phone_no,
            gender:data.gender,
            relationship:data.relationship,
            birthdate:data.birthdate,
            state:data.state,
            city:data.city,
            address:JSON.stringify(data.address),
            prefered_location:JSON.stringify(data.prefered_location),
            notice_period:data.notice_period!=""?data.notice_period:0,
            expected_ctc:data.expected_ctc,
            current_ctc:data.current_ctc!=""?data.current_ctc:0,
            department:data.department
        }
    var res=await db.update(obj,"candidate_masters",{id:data.canid})
    
    var result=await db.executrquery(`select id,candidate_id,course,board,passing_year,percentage from 
    education_details where candidate_id=${data.canid}`);
    var result1=result;
    
    for(var i=0;i<data.course.length;i++)
    {
        var flag=false;
        for(var j=0;j<result.length;j++)
        {
            if(data.course[i]==result[j]["course"])
            {
                flag=true
            }
        }
        if(flag==true)
        {
            var result=await db.update({
                course:data.course[i],
                board:data.board[i],
                passing_year:data.passing_year[i],
                percentage:data.percentage[i],
            },"education_details",{candidate_id:data.canid,course:data.course[i]})
            if(result.affectedRows==0)
            {
                var result=await db.insertdata({
                    candidate_id:data.canid,
                    course:data.course[i],
                    board:data.board[i],
                    passing_year:data.passing_year[i],
                    percentage:data.percentage[i],
                },"education_details")
            }
        }
        else
        {
            var result=await db.delete("education_details",{candidate_id:data.canid,course:data.course[i]});
            console.log("yes")
                var result=await db.insertdata({
                    candidate_id:data.canid,
                    course:data.course[i],
                    board:data.board[i],
                    passing_year:data.passing_year[i],
                    percentage:data.percentage[i],
                },"education_details")
        }
    }
    // console.log(data.course.length,result.length)
    for(var i=data.course.length;i<result1.length;i++)
    {
        var result=await db.delete("education_details",{candidate_id:data.canid,course:result1[i].course});
    }

    // ---------------------------work ------------------

    var result=await db.executrquery(`select * from work_experiences2 where candidate_id=${data.canid}`);
    var result1=result;
    
    for(var i=0;i<data.company_name.length;i++)
    {
        var flag=false;
        for(var j=0;j<result.length;j++)
        {
            if(data.name[i]==result[j]["company_name"])
            {
                flag=true
            }
        }
        if(flag==true)
        {
            var result=await db.update({
                company_name:data.company_name[i],
                work_designation:data.work_designation[i],
                from_date:data.from_date[i],
                to_date:data.to_date[i],
            },"work_experiences2",{candidate_id:data.canid,company_name:data.company_name[i]})
            if(result.affectedRows==0)
            {
                var result=await db.insertdata({
                    candidate_id:data.canid,
                    company_name:data.company_name[i],
                    work_designation:data.work_designation[i],
                    from_date:data.from_date[i],
                    to_date:data.to_date[i],
                },"work_experiences2")
            }
        }
        else
        {
            var result=await db.delete("work_experiences2",{candidate_id:data.canid,company_name:data.company_name[i]});
            // console.log("yes")
                var result=await db.insertdata({
                    candidate_id:data.canid,
                    company_name:data.company_name[i],
                    work_designation:data.work_designation[i],
                    from_date:data.from_date[i],
                    to_date:data.to_date[i],
                },"work_experiences2")
        }
    }
    for(var i=data.name.length;i<result1.length;i++)
    {
        var result=await db.delete("work_experiences2",{candidate_id:data.canid,company_name:result1[i].name});
    }

    // -------------------- references --------------------
    var result=await db.executrquery(`select * from reference_contacts where candidate_id=${data.canid}`);
    var result1=result;
    
    for(var i=0;i<data.name.length;i++)
    {
        var flag=false;
        for(var j=0;j<result.length;j++)
        {
            if(data.name[i]==result[j]["name"])
            {
                flag=true
            }
        }
        if(flag==true)
        {
            var result=await db.update({
                name:data.name[i],
                contact:data.contact[i],
                relation:data.relation[i],
            },"reference_contacts",{candidate_id:data.canid,name:data.name[i]})
            if(result.affectedRows==0)
            {
                var result=await db.insertdata({
                    candidate_id:data.canid,
                    name:data.name[i],
                    contact:data.contact[i],
                    relation:data.relation[i],
                },"reference_contacts")
            }
        }
        else
        {
            var result=await db.delete("reference_contacts",{candidate_id:data.canid,name:data.name[i]});
            // console.log("yes")
                var result=await db.insertdata({
                    candidate_id:data.canid,
                    name:data.name[i],
                    contact:data.contact[i],
                    relation:data.relation[i],
                },"reference_contacts")
        }
    }
    for(var i=data.name.length;i<result1.length;i++)
    {
        var result=await db.delete("reference_contacts",{candidate_id:data.canid,name:result1[i].name});
    }


    // languages

    var arr=["hindi","english","gujrati"]
    var language=[]
    arr.forEach(key =>{
        if(data[key]!=undefined)
        {
            arr=data[key]
            language.push(key)
            data[key]=JSON.stringify(arr.slice(1,arr.length))
        }        
    })
    console.log(data,language)
    var result=await db.executrquery(`select * from languages where candidate_id=${data.canid}`);
    var result1=result;
    
    for(var i=0;i<language.length;i++)
    {
        var flag=false;
        for(var j=0;j<result.length;j++)
        {
            if(language[i]==result[j]["language"])
            {
                flag=true
            }
        }
        if(flag==true)
        {
            var result=await db.update({
                language:language[i],
                language_lvl:data[language[i]]
            },"languages",{candidate_id:data.canid,language:language[i]})
            if(result.affectedRows==0)
            {
                var result=await db.insertdata({
                    candidate_id:data.canid,
                    language:language[i],
                    language_lvl:data[language[i]],
                },"languages")
            }
        }
        else
        {
            var result=await db.delete("languages",{candidate_id:data.canid,language:language[i]});
            // console.log("yes")
                var result=await db.insertdata({
                    candidate_id:data.canid,
                    language:language[i],
                    language_lvl:data[language[i]],
                },"languages")
        }
    }
    for(var i=language.length;i<result1.length;i++)
    {
        var result=await db.delete("languages",{candidate_id:data.canid,language:result1[i]["language"]});
    }
    
    // ----------------technologies-------------------//
    var arr=["php","laravel","oracle","mysql"]
    var tech=[]
    arr.forEach(key =>{
        if(data[key]!=undefined)
        {
            arr=data[key]
            tech.push(key)
            data[key]=JSON.stringify(arr.slice(1,arr.length))
        }        
    })
    // console.log(data,language)
    var result=await db.executrquery(`select * from technologies where candidate_id=${data.canid}`);
    var result1=result;
    
    for(var i=0;i<tech.length;i++)
    {
        var flag=false;
        for(var j=0;j<result.length;j++)
        {
            if(tech[i]==result[j]["technology"])
            {
                flag=true
            }
        }
        if(flag==true)
        {
            var result=await db.update({
                technology:tech[i],
                technology_lvl:data[tech[i]]
            },"technologies",{candidate_id:data.canid,technology:tech[i]})
            if(result.affectedRows==0)
            {
                var result=await db.insertdata({
                    candidate_id:data.canid,
                    technology:tech[i],
                technology_lvl:data[tech[i]],
                },"technologies")
            }
        }
        else
        {
            var result=await db.delete("technologies",{candidate_id:data.canid,technology:tech[i]});
            // console.log("yes")
                var result=await db.insertdata({
                    candidate_id:data.canid,
                    technology:tech[i],
                    technology_lvl:data[tech[i]],
                },"technologies")
        }
    }
    for(var i=tech.length;i<result1.length;i++)
    {
        var result=await db.delete("technologies",{candidate_id:data.canid,language:result1[i]["technology"]});
    }
})

module.exports={getForm,postForm,getData,getDisplay,getDeleteId,getDataId,getUpdateId,postUpdateId}