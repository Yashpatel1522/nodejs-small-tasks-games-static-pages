
function dowon(id) {
    window.scrollTo(0, window.scrollY + 670);
}


var oldid = "wordpress";
function fun(id) {
    var id2 = document.getElementById(id);
    var oldid2 = document.getElementById(oldid);
    oldid2.style.display = "none";
    id2.style.display = "block";
    oldid = id;
}

function next(id) {
    var id2 = document.getElementById(id);
    id2.scrollBy(280,0)
}
function pre(id) {
    var id2 = document.getElementById(id);
    id2.scrollBy(-280,0)
}