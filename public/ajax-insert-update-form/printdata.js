


const fun=async()=>{
    const response=await fetch('/ajax-form/data')
    return await response.json();
}

// var page=0;  
const start=(obj,btn)=>{

    var total_page=Math.ceil(obj.data.length/obj.record_per_page);
    console.log(total_page,obj.page);

    if(total_page==0)
    {
        document.getElementById(obj.btn_id[0]).disabled=false;
        document.getElementById(obj.btn_id[1]).disabled=false;
        document.getElementById(obj.btn_id[2]).disabled=false;
        document.getElementById(obj.btn_id[3]).disabled=false;
    }
    else if(btn=='next')
    {   
        if(obj.page+1==total_page)
        {
            document.getElementById(obj.btn_id[2]).disabled=true;
            document.getElementById(obj.btn_id[3]).disabled=true;
        }
        else
        {
            obj.page++;
            var start_poi=obj.page*obj.record_per_page;
            console.log('start',start_poi);
            var end=start_poi+obj.record_per_page;  
            console.log('end',end);

            printdata(start_poi,end,obj);
            document.getElementById(obj.btn_id[0]).disabled=false;
            document.getElementById(obj.btn_id[1]).disabled=false;
            
        }
    }
    else if(btn=='last')
    {
            obj.page=total_page-1;
            var start_poi=obj.page*obj.record_per_page;
            var end=start_poi+obj.record_per_page;
            
            printdata(start_poi,end,obj);

            document.getElementById(obj.btn_id[2]).disabled=true;
            document.getElementById(obj.btn_id[3]).disabled=true;
            document.getElementById(obj.btn_id[0]).disabled=false;
            document.getElementById(obj.btn_id[1]).disabled=false;

    }
    else if(btn=='prev')
    {
            if(obj.page==1)
            {
                document.getElementById(obj.btn_id[0]).disabled=true;
                document.getElementById(obj.btn_id[1]).disabled=true;
            }

            obj.page--;
            var start_poi=obj.page*obj.record_per_page;
            var end=start_poi+obj.record_per_page;
            printdata(start_poi,end,obj);
            document.getElementById(obj.btn_id[2]).disabled=false;
            document.getElementById(obj.btn_id[3]).disabled=false;
            
    }
    else if(btn=='first')
    {
            obj.page=0;
            var start_poi=obj.page*obj.record_per_page;
            var end=start_poi+obj.record_per_page;
            
            printdata(start_poi,end,obj);

            document.getElementById(obj.btn_id[2]).disabled=false;
            document.getElementById(obj.btn_id[3]).disabled=false;
            document.getElementById(obj.btn_id[0]).disabled=true;
            document.getElementById(obj.btn_id[1]).disabled=true;  
    }
    else
    {
        printdata(0,obj.record_per_page,obj);
        document.getElementById(obj.btn_id[0]).disabled=true;
        document.getElementById(obj.btn_id[1]).disabled=true;
    }
    document.getElementById(obj.print_id).innerHTML=obj.page;    
}




const printdata=((strat,end,obj)=>{
    // console.log(obj.page,obj.data.length/obj.record_per_page);

    var tbl=obj.table_id;
    var tbl_id=document.getElementById(tbl);
    var data=obj.data;

    var fields=['id','first_name','last_name','email','phone_no','gender','operation'];

    // var fields=Object.keys(data[0]);
    tbl_id.innerHTML="";
   
   
    var tr=document.createElement('tr');
    for(var i=0;i<fields.length;i++)
    {
        var td=document.createElement('td');
        td.innerHTML=fields[i];
        tr.appendChild(td)
    }
    tbl_id.appendChild(tr);


    for(var i=strat;i<end;i++)
    {
        var tr=document.createElement('tr');
        for(var j=0;j<fields.length;j++)
        {
            var td=document.createElement('td')
            if(fields[j]=="operation")
            {
                td.innerHTML=`<a href="/ajax-form/data/${data[i][fields[0]]}">view</a>&emsp;<a href="/ajax-form/update/${data[i][fields[0]]}">Update</a>&emsp;<a href="/ajax-form/delete/${data[i][fields[0]]}">delete</a>`;
            }
            else
            {
                td.innerHTML=data[i][fields[j]];
            }
            tr.appendChild(td);
            
            // if(fields[j]=='view details')
            // {
            //    var td=document.createElement('td')
            //    var btn=document.createElement('button');
            //    btn.setAttribute('id',`${data[i].id}`)
            //    btn.setAttribute('class','color')
            //    btn.setAttribute('onclick','details(id)')
            //    let btn1=document.createTextNode('view details')
            //    btn.appendChild(btn1);
            //    td.appendChild(btn);
            //    tr.appendChild(td);
            // }
            // else
            // {
            //     var td=document.createElement('td');
            //     td.innerHTML=data[i][fields[j]];
            //     tr.appendChild(td)
            // }    
        }
        tbl_id.appendChild(tr);
    }
})
const details=(id)=>{
    window.location.href=`post-details/${id}`;  
}
