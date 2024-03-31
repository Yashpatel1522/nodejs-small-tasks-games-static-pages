const mysql=require('mysql');
const database = require('../../models/ajax-insert-update-form/database');

const getResult=(async(req,res)=>{
            
    var query = require("url").parse(req.url, true).query;
    var data_per_page=10;
    var total_record=200;
    var page=Number(query.page) || 1;
    var start=(data_per_page)*(page-1);
    

    var mon_year=query.month || '12-2023';
    var arr=mon_year.split('-');
    var mon=arr[0];
    var year=arr[1];

    var con=new database(process.env.database)

    var q=`select stdatt_student_master.std_id,stdatt_student_master.first_name,
    sum( 
    case 
        when exam_id=1 then theory_mark
        else 0
    end 
    )as ter_theory_mark,
    sum( 
    case 
        when exam_id=1 then practical_mark
        else 0
    end 
    )as ter_practical_mark,
    sum( 
    case 
        when exam_id=2 then theory_mark
        else 0
    end 
    )as pri_theory_mark,
    sum( 
    case 
        when exam_id=2 then practical_mark
        else 0
    end 
    )as pri_practical_mark,
    sum( 
    case 
        when exam_id=3 then theory_mark
        else 0
    end 
    )as final_theory_mark,
    sum( 
    case 
        when exam_id=3 then practical_mark
        else 0
    end 
    )as final_practical_mark,
    sum(
        theory_mark+practical_mark
    )as total_mark
    from stdatt_result
    left join stdatt_student_master on
    stdatt_result.std_id=stdatt_student_master.std_id
    GROUP BY stdatt_result.std_id
    limit ${start},${data_per_page};`

    var data=await con.executrquery(q)
    console.log(data);
        if(typeof data=="string")
        {
            console.log(data)
        }
        else
        {
            res.render('student-result/page1.ejs',{res1:data,totalrec:total_record,pageno:page});
        }
})

const getResId=(async(req,res)=>{
var id=Number(req.params.id);

var con=new database(process.env.database)

var q=`select stdatt_student_master.std_id,first_name,last_name,
count(stdatt_attendance.std_id) as no_of_day,
round(count(stdatt_attendance.std_id)/.3,2) as "percentage"
from stdatt_student_master left join stdatt_attendance
on stdatt_student_master.std_id=stdatt_attendance.std_id
where attendance="present" and month(attance_date)='12' and year(attance_date)='2023' and stdatt_attendance.std_id=${id}
group by stdatt_attendance.std_id 
order by stdatt_attendance.std_id asc;`

var q2=`select subject_name,subject_id,exam_name,theory_mark,practical_mark
from stdatt_result
left join stdatt_subject_master on
stdatt_result.sub_id=stdatt_subject_master.subject_id
left join stdatt_exam_master on
stdatt_result.exam_id=stdatt_exam_master.exam_id
where std_id=${id};`


var data=await con.executrquery(q)
if(typeof data=="string")
{
    console.log(data)
}
else
{
    console.log(data);

    var data2=await con.executrquery(q2);
    if(typeof data2=="string")
    {
        console.log(data2)
    }
    else
    {
      console.log(data2);

        res.render('student-result/page2.ejs',{res2:data2,res1:data});
    }
}




// var con=mysql.createConnection({
// host:"localhost",
// user:"root",
// password:"Root@123",
// database:"combinedtasks"
// });

// con.connect((err)=>{
// if(err)console.log(err)
// console.log("conected....");


// var q=`select stdatt_student_master.std_id,first_name,last_name,
// count(stdatt_attendance.std_id) as no_of_day,
// round(count(stdatt_attendance.std_id)/.3,2) as "percentage"
// from stdatt_student_master left join stdatt_attendance
// on stdatt_student_master.std_id=stdatt_attendance.std_id
// where attendance="present" and month(attance_date)='12' and year(attance_date)='2023' and stdatt_attendance.std_id=${id}
// group by stdatt_attendance.std_id 
// order by stdatt_attendance.std_id asc;`

// var q2=`select subject_name,subject_id,exam_name,theory_mark,practical_mark
// from stdatt_result
// left join stdatt_subject_master on
// stdatt_result.sub_id=stdatt_subject_master.subject_id
// left join stdatt_exam_master on
// stdatt_result.exam_id=stdatt_exam_master.exam_id
// where std_id=${id};`

// var mypromise=new Promise((resolve,reject)=>{
//     con.query(q,(err,result)=>{
//         if(err)reject(err);
//         else
//         {
//             resolve(result);
//         }
//     })
// })
// mypromise.then((data)=>{
//     console.log(data);
//     // res.render('page2.ejs',{res1:data});
//     var mypromise2=new Promise((resolve,reject)=>{
//         con.query(q2,(err,result)=>{
//             if(err)reject(err);
//             else
//             {
//                 resolve(result);
//             }
//         })
//     })
//     mypromise2.then((data2)=>{
//         console.log(data2);
//         res.render('student-result/page2.ejs',{res2:data2,res1:data});
//     }).catch((err)=>{
//         console.log(err);
//     })
// }).catch((err)=>{
//     console.log(err);
// })
// })
})

module.exports={getResult,getResId}