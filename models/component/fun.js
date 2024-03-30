const fun=(res1,res2,search)=>{
    arr=[];
    final=[];
    for(var i=0;i<res2.length;i++)
    {
        if(search==res2[i].select_name)
        {
            arr.push(res2[i].select_key);
            arr.push(res2[i].type);
        }
    }

    for(var j=0;j<res1.length;j++)
    {
        if(arr[0]==res1[j].select_key)
        {
            final.push(res1[j].option_key)
            final.push(res1[j].option_label)

        }
    }
    var obj={
        arr:arr,
        final:final,
    }    
    return obj
}

module.exports=fun;