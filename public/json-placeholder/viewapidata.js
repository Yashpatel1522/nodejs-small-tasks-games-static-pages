const viewapidata=(tblid,data,hidetbl)=>{
    var tbl=tblid;
    var tbl_id=document.getElementById(tbl);
    var data=data;
    // console.log(data);


// var fields=['id','slug','title','category','view details'];

    var fields=Object.keys(data);  

    // console.log(fields);          
    tbl_id.innerHTML="";

    for(var i=0;i<fields.length;i++)
    {
        var tr=document.createElement('tr');
        var td=document.createElement('td');
        td.innerHTML=fields[i];
        tr.appendChild(td);
        if(fields[i]=='image')
        {
            var td=document.createElement('td')
            td.innerHTML=`<img src='${data[fields[i]]}' height='100px'>`
            tr.appendChild(td);
        }
        else if(fields[i]=='thumbnail')
        {
            var td=document.createElement('td')
            td.innerHTML=`<img src='${data[fields[i]]}' height='100px'>`
            tr.appendChild(td);

        }
        else
        {
            var td=document.createElement('td');
            td.innerHTML=data[fields[i]]
            tr.appendChild(td);
        }          
        tbl2.appendChild(tr);
        
    }
        var tr2=document.createElement('tr');
        var td2=document.createElement('td');
        var btn2=document.createElement('button');
        var print2=document.createTextNode('view comments');
        btn2.setAttribute('onclick',`toggle(${data.id},'${hidetbl}')`);
        btn2.appendChild(print2);
        td2.appendChild(btn2);
        tr2.appendChild(td2);
        tbl2.appendChild(tr2);

}

const toggle=(id,tblhideid)=>{
document.getElementById(tblhideid).innerHTML="";
if(document.getElementById(tblhideid).style.display=='none')
    {
        console.log(id);
        document.getElementById(tblhideid).style.display='block';
        
        const fun2=async()=>{
            var result=await fetch('https://jsonplaceholder.typicode.com/comments');
            return await result.json();
        }

        fun2().then((data)=>{
            var arr=[]
            // console.log(data);
            data.forEach(element => {
                if(element.postId==id)
                {
                    arr.push(element);
                }
            });
            var tbl3=document.getElementById('tbl3')
            if(arr.length>0)
            {
                var tr=document.createElement('tr');
                var td=document.createElement('td');
                td.innerHTML=`user id:${id}`;
                tr.appendChild(td);
                tbl3.appendChild(tr);
                for(var i=0;i<arr.length;i++)
                {
                    var tr=document.createElement('tr');
                    var td=document.createElement('td');
                    td.innerHTML=`comments :${arr[i].body}`;
                    tr.appendChild(td);
                    tbl3.appendChild(tr);
                }                                    
            }
            else
            {
                tbl3.innerHTML=`<p style="background-color: red; color: white;">Comments Are Not Avilable</p>`;                                
            }
        })

    }
    else
    {
        document.getElementById(tblhideid).style.display='none';
    }
}
