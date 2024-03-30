const fetchdata=async(url)=>{
    var res= await (await fetch(url)).json();
    return res;
}

const printoptions=(data,id)=>
{
    var id=document.getElementById(id);
    id.innerHTML="";
    for(var i=0;i<data.length;i++)
    {
        id.innerHTML+=`<option value=${data[i][0]}>${data[i][1]}</option>`;
    }
}