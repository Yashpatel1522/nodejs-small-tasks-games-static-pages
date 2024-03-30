const fun2=(arr,field)=>{
    
    if(arr.length>0)
    {
        let temp =`${field} like "%${arr[0]}%"`;
        for(var i=1;i<arr.length;i++)
        {
            temp +=`OR ${field} like "%${arr[i]}%"`
        }
        return temp;
    }
    else
    {
        return "";
    }
}
module.exports=fun2;