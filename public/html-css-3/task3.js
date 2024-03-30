 var count=0;
 function next(id)
 {
    var scroll=document.getElementById(id);
    if(count<scroll.children.length-1)
    {
        scroll.children[count].style.display="none";
        scroll.children[++count].style.display="flex";
    }
 } 


 function pre(id)
 {
    var scroll=document.getElementById(id);
    if(count>0)
    {
        scroll.children[count].style.display="none";
        scroll.children[--count].style.display="flex";
    }
 } 