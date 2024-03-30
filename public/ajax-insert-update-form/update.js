const displayarray=(arr)=>{
    console.log(arr)
    arr.forEach(obj=>{
        var nodes=obj.nodes.map(node=> document.getElementsByName(node))
        data=obj.data;
        
        for(let i=0;i<data.length-1;i++)
        {
            add(obj.genratedId,data.length+1)
        }
        // console.log(nodes)
        for(let i=0;i<nodes[0].length;i++)
        {
            let keys=Object.keys(data[i])
            console.log(keys)
            keys.forEach((key,j)=>{
                switch(nodes[j][i].type)
                {
                    case 'select-one':
                    case 'select-multiple':
                        let selected=typeof data[i][key]=='object'?data[i][key]:[data[i][key]];
                        let options=Object.values(nodes[j][i].options);
                        options.forEach(option=>{
                            
                            if(selected.indexOf(option.value)>=0)
                            option.selected=true;
                        })
                        break;
                    default:
                        nodes[j][i].value=data[i][key];
                }
            })
        }
    })
}
const valueprint=(obj)=>
{   
    // console.log(obj)
    var key=Object.keys(obj)
    var nodes=key.map(ele=>
        document.getElementsByName(ele)[0]
    )
    // console.log(nodes)
    nodes.forEach((node,count)=>{
        // console.log(node,node.type)
        switch(node.type)   
        {

            case 'text':
            case 'number':
            case 'hidden':
            case 'textarea':
                node.value=obj[key[count]];
                break;
            case 'select-one':
            case 'select-multiple':
                // console.log([...obj[key[count]]])
                // console.log([obj[key[count]]])
                // console.log("-----------",typeof obj[key[count]])
                
                let selected = typeof obj[key[count]] == 'object'?[...obj[key[count]]]:[obj[key[count]]];
                let option=Object.values(node.options);
             
                option.forEach(op=>{
                
                    if(selected.indexOf(op.value)>=0)
                    {
                        op.selected=true;
                    }
                })
                break; 
        }
    })
}
const radio=(obj)=>{
        var key=Object.keys(obj)
        // console.log(key)
        var nodes=key.map(ele=>document.getElementsByName(ele)
            )
            // console.log(nodes)
            nodes[0].forEach((node)=>{
            // console.log(node);

            if(node.value == obj.gender)
            {
                // console.log(node);
                node.checked=true;
            }
        })
}
const update=(mainobj)=>{
    // console.log(data.refcon);
    var data=mainobj.candidate_masters[0];

        obj={
            canid:data.id,
            first_name:data.first_name,
            last_name: data.last_name,
            designation:data.designation,
            email:data.email,
            phone_no:data.phone_no,
            relationship:data.relationship,
            birthdate:data.birthdate,
            state:data.state,
            city:data.city,
            notice_period:data.notice_period,
            expected_ctc:data.expected_ctc,
            current_ctc:data.current_ctc,
            department:data.department
           }
    
    valueprint(obj);
    var obj2={
         gender:data.gender,
    }
    radio(obj2);
    address=JSON.parse(data.address)
    document.getElementById('address1').value=address[0];
    document.getElementById('address2').value=address[1];

    console.log(mainobj.education_details)
    obj=[
        {
        nodes:['course','board','passing_year','percentage'],
        data:mainobj.education_details,
        genratedId:'edu'},

        {
            nodes:['company_name','work_designation','from_date','to_date'],
            data:mainobj.work_experiences,
            genratedId:'work'},

        {
            nodes:['name','contact','relation'],
            data:mainobj.reference_contacts,
            genratedId:'ref'
        },
            
         
    ]
    displayarray(obj);
    const displayArrayData=(obj)=>{
        let nodes=Object.keys(obj).map(item=> document.getElementsByName(item));
        let keys=Object.keys(obj);

        nodes.forEach((node,count)=>{

            var selected=typeof obj[keys[count]]=='object'?[...obj[keys[count]]]:[obj[keys[count]]];
            
            node.forEach((item,selectedcount)=>{
                switch(item.type)
                {
                    case 'radio':
                    case 'checkbox':
                        if(selected.indexOf(item.value)>=0)
                            item.checked="true";
                        break;
                    default:
                        item.value=selected[selectedcount];
                }
            })
        })
    }
    const convertArrayData=(languages,key)=>{
        let result={};
        languages.forEach(language=>{
            let arr=[language[key[0]]];
            language[key[1]].forEach(item=>{
                arr.push(item);
            })
            result[language[key[0]]]=arr;
        })
        return result;
    }
    var obj1={};
    var languages=mainobj.languages;
    var technology=mainobj.technologies;
    
    languages=convertArrayData(languages,['language','language_lvl']);
    console.log(languages)
    let keys=Object.keys(languages);
    console.log(keys)
    keys.forEach(key=>{
        obj1[key]=languages[key];
    })

    technology=convertArrayData(technology,['technology','technology_lvl']);
    console.log(technology)
     keys=Object.keys(technology);
    console.log(keys)
    keys.forEach(key=>{
        obj1[key]=technology[key];
    })


    displayArrayData(obj1);
   

    // // var education=data.education[0];
    // if(data.education!=null)
    // {   
    //     arr=['ssc','hsc'];
    //     var nodes=arr.map(ele =>document.getElementsByName(ele))
    //     for(var i=0;i<nodes.length;i++)
    //     {
    //         if(data.education[i])
    //         {
    //             nodes[i][0].value=data.education[i].uni_or_board
    //             nodes[i][1].value=data.education[i].passing_year
    //             nodes[i][2].value=data.education[i].percentage
    //         }
                   
    //     }
        
    //         var arr2=['ug','pg']
    //         var nodes2=arr2.map(ele =>document.getElementsByName(ele))
    
    //         if(data.education[2])
    //         {
    //                 nodes2[0][0].value=data.education[2].course
    //                 nodes2[0][1].value=data.education[2].uni_or_board
    //                 nodes2[0][2].value=data.education[2].passing_year
    //                 nodes2[0][3].value=data.education[2].percentage   
    
    //         }
    //         if(data.education[3])
    //         {
    //             nodes2[1][0].value=data.education[3].course
    //             nodes2[1][1].value=data.education[3].uni_or_board
    //             nodes2[1][2].value=data.education[3].passing_year
    //             nodes2[1][3].value=data.education[3].percentage   
    //         }            
    

    // }
   
    //    if(data.work!=null)
    //    {    
    //     var arr3=['work1','work2','work3'];
    //     var nodes3=arr3.map(ele =>document.getElementsByName(ele))
    //     for(var i=0;i<nodes3.length;i++)
    //     {
    //         if(data.work[i])
    //         {
    //             nodes3[i][0].value=data.work[i].company_name
    //             nodes3[i][1].value=data.work[i].designation
    //             nodes3[i][2].value=data.work[i].form_date   
    //             nodes3[i][3].value=data.work[i].to_date 
    //         }  
    //     }   
    //    }      
        
        

    //     if(data.ref!=null)
    //     {
    //                 var arr5=['pre1','pre2'];
    //         var nodes5=arr5.map(ele =>document.getElementsByName(ele))
    //         console.log(nodes5)
    //         for(var i=0;i<nodes5.length;i++)
    //         {
    //             if(data.ref[i])
    //             {
    //                 nodes5[i][0].value=data.ref[i].name
    //                 nodes5[i][1].value=data.ref[i].phone_number
    //                 nodes5[i][2].value=data.ref[i].relation
    //             }
    //         }

    //     }
    //     console.log(data.refcon)
   
    
    // if(data.refcon!=null)
    // {
    //     var ob={
    //         preloc:data.refcon[0].prefered_location,
    //         np:data.refcon[0].notice_periods,
    //         cctc:data.refcon[0].expected_ctc,
    //         ectc:data.refcon[0].current_ctc,
    //         dept:data.refcon[0].department
    //     }
    //     valueprint(ob)
    // }
    // if(data.language!=null)
    // {
    //     for(var i=0;i<data.language.length;i++)
    //     {
    //         if(data.language[i].languages)
    //         {
    //             var nodes=document.getElementsByName(data.language[i].languages);
    //             nodes[0].checked=true
    //             if(data.language[i].reading!='null')
    //             {
    //                 nodes[1].checked=true
    //             }
    //             if(data.language[i].writes!='null')
    //             {
    //                 nodes[2].checked=true
    //             }
    //             if(data.language[i].speak!='null')
    //             {
    //                 nodes[3].checked=true
    //             }
    //         }
    //     }
    // }   
    // if(data.tech!=null)
    // {
    //     for(var i=0;i<data.tech.length;i++)
    //     {
    //         var nodes=document.getElementsByName(data.tech[i].technologies_name);
    //         nodes[0].checked=true
            
    //         if(data.tech[i].leveles=='b')
    //         {
    //             nodes[1].checked=true;
    //         }
    //         if(data.tech[i].leveles=='m')
    //         {
    //             nodes[2].checked=true;
    //         }
    //         if(data.tech[i].leveles=='ex')
    //         {
    //             nodes[3].checked=true;
    //         }
    //     }
    // }
}