const express=require('express');
const path = require('path');
const router = require('./routes/main-login-project/practical-1');
const app=express();
var cookieParser = require('cookie-parser');
const dynemic_table = require('./routes/dynemic-table/dynemictable');
const { getLogin } = require('./controllers/main-login-project/practical1');
const cucu_cube = require('./routes/cucu-cube/cucu-cube');
const tic_tac_toe = require('./routes/tic-tac-toe/tic-tac-toe');
const sorting_Int = require('./routes/sorting-int-char-string/sorting');
const jsevent = require('./routes/event-prac/event');
const getatt = require('./routes/student-attendance/student');
const studentresult = require('./routes/student-result/student');
const delisearch = require('./routes/deli-search/deli');
const component = require('./routes/component/component');
const simpleinsertupdate = require('./routes/insert-update-employee-form/insertupdate');
const paginationorderby = require('./routes/pagination-orderby/pagiroutes');
const citystate = require('./routes/city-state-combo/citystate');
const timezone = require('./routes/time-zone/time-zone');
const ajaxform = require('./routes/ajax-insert-update-form/ajax-form');
const jsonapi = require('./routes/json-placeholder/json');
const andorsearch = require('./routes/perticular-search-and-or/search');
const htmlcss1 = require('./routes/html-css-1/html');
const htmlcss2 = require('./routes/html-css-2/html');
const htmlcss3 = require('./routes/html-css-3/html');
const forallcheckToken = require('./middlewares/forallroutercheck');

require('dotenv').config()


app.set('view engine','ejs')
app.use(express.static(path.join(__dirname+'/public')))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())


app.listen(process.env.PORT,(err)=>{
    if(err)
    {
        console.log(err);
    }
    else
    {   
        app.use("/main-login-project",router);
        app.use("/dynemic-table",forallcheckToken,dynemic_table)
        app.use("/cucu-cube",forallcheckToken,cucu_cube)
        app.use("/tic-tac-toe",forallcheckToken,tic_tac_toe)
        app.use("/sorting-int",forallcheckToken,sorting_Int)
        app.use("/js-event",forallcheckToken,jsevent)
        app.use("/std-attendance",forallcheckToken,getatt)
        app.use("/student-result",forallcheckToken,studentresult)
        app.use("/deli-search",forallcheckToken,delisearch)
        app.use("/component",forallcheckToken,component)
        app.use("/insert-update-employee-form/",forallcheckToken,simpleinsertupdate)
        app.use("/pagination-orderby",forallcheckToken,paginationorderby)
        app.use("/city-state",forallcheckToken,citystate)
        app.use("/time-zone",forallcheckToken,timezone)
        app.use("/ajax-form",forallcheckToken,ajaxform)
        app.use("/json-placeholder",forallcheckToken,jsonapi)
        app.use("/and-or-search",forallcheckToken,andorsearch)
        app.use("/html-css-1",forallcheckToken,htmlcss1)
        app.use("/html-css-2",forallcheckToken,htmlcss2)
        app.use("/html-css-3",forallcheckToken,htmlcss3)
        app.get("/",getLogin);

        console.log(`server listen on http://${process.env.HOST}:${process.env.PORT}`)
    }
})