const mysql=require('mysql');

const getAttendance=((req,res)=>{
            
            var query = require("url").parse(req.url, true).query;
            var data_per_page=10;
            var total_record=200;
            var page=Number(query.page) || 1;
            var start=(data_per_page)*(page-1);
            
            var mon_year=query.month || '12-2023';
            var arr=mon_year.split('-');
            var mon=arr[0];
            var year=arr[1];

        var con=mysql.createConnection({
            host:"localhost",
            user:"root",
            password:"Root@123",
            database:"combinedtasks"
        });
        
        con.connect((err)=>{
            if(err)console.log(err)
            console.log("conected....");
    
    
            var q=`select stdatt_student_master.std_id,first_name,last_name,count(stdatt_attendance.std_id) as no_of_day,round(count(stdatt_attendance.std_id)/.3,2) as "percentage"from stdatt_student_master left join stdatt_attendance on stdatt_student_master.std_id=stdatt_attendance.std_id where attendance="present" and month(attance_date)=${mon} and year(attance_date)=${year} group by stdatt_attendance.std_id order by stdatt_attendance.std_id asc limit ${data_per_page} offset ${start};`
    
            var mypromise=new Promise((resolve,reject)=>{
                con.query(q,(err,result)=>{
                    if(err)reject(err);
                    else
                    {
                        resolve(result);
                    }
                })
            })
            mypromise.then((data)=>{
                console.log(data);
                res.render('student-attendance/page1.ejs',{res1:data,mon:mon_year,pageno:page,totalrec:total_record});
            }).catch((err)=>{
                console.log(err);
            })
    
     })
})

module.exports=getAttendance;