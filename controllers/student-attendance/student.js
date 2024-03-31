const mysql=require('mysql');
const database = require('../../models/ajax-insert-update-form/database');

const getAttendance=(async(req,res)=>{
            
            var query = require("url").parse(req.url, true).query;
            var data_per_page=10;
            var total_record=200;
            var page=Number(query.page) || 1;
            var start=(data_per_page)*(page-1);
            
            var mon_year=query.month || '12-2023';
            var arr=mon_year.split('-');
            var mon=arr[0];
            var year=arr[1];

        var con=new database(process.env.database);
        var q=`select stdatt_student_master.std_id,first_name,last_name,count(stdatt_attendance.std_id) as no_of_day,round(count(stdatt_attendance.std_id)/.3,2) as "percentage"from stdatt_student_master left join stdatt_attendance on stdatt_student_master.std_id=stdatt_attendance.std_id where attendance="present" and month(attance_date)=${mon} and year(attance_date)=${year} group by stdatt_attendance.std_id order by stdatt_attendance.std_id asc limit ${data_per_page} offset ${start};`
        try{
            var data=await con.executrquery(q)
            if(typeof(data)=="string")
            {
                console.log(data);
            }
            else
            {   
                res.render('student-attendance/page1.ejs',{res1:data,mon:mon_year,pageno:page,totalrec:total_record});
            }
        }
        catch(e)
        {
            console.log(e)
        }      
})

module.exports=getAttendance;