const { query } = require('express')
const mysql=require('mysql')


class connection{

    constructor(db)
    {
        this.con=mysql.createConnection({
            user:"root",
            host:"localhost",
            password:"",
            database:db,
            dateStrings:true
        })
       
    }
    
    connect=async()=>{
            this.con.connect(err=>{
                let result=new Promise((resolve,reject)=>{

                    if(err)
                    {
                        reject(err);
                    }
                    else
                    {
                        console.log("connected with db");
                        resolve (this.con)
                    }
                })
       
            })
            result=await result.then(result=>{
                return result;
            }).catch(err=>{
                return err.sqlMessage;
            })
            return result;
    }


     fatchdata=async(query)=>{

      let result=  new Promise((resolve,reject)=>{
            this.con.query(query,(err,result)=>{
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve(result);
                }
            })
        })
        result=await result.then(result=>{
            return result;
        }).catch(err=>{
            return err.sqlMessage;
        })
        return result;
     }

     fatchdata2=async(table,id)=>{
        var q=`select * from ${table} where can_id=${id}`;
        console.log(q);
        let result=  new Promise((resolve,reject)=>{
              this.con.query(q,(err,result)=>{
                  if(err)
                  {
                      reject(err)
                  }
                  else
                  {
                      resolve(result);
                  }
              })
          })
          result=await result.then(result=>{
              return result;
          }).catch(err=>{
              return err.sqlMessage;
          })
          return result;
       }

    createquery=async(table,data)=>{
        var fields=Object.keys(data);
        console.log("hsshh")
        var query=`insert into ${table}(`
            fields.forEach(key=>{
                query+=`${key},`
            })
            query=query.slice(0,query.length-1)+') values(';
            console.log(query)
            fields.forEach(ele=>{
                query+=`'${data[ele]}',`
            })

            query=query.slice(0,query.length-1)+')';

            console.log(query);

            return await this.fatchdata(query);
    }

    update=async(table,data,conditions)=>{
        var q=`update ${table} set `;
        var keys=typeof Object.keys(data)=="string"?[Object.keys(data)]:Object.keys(data);

        keys.forEach(key=>{
            q+= `${key} = '${data[key]}',`
        })
            q=q.slice(0,q.length-1)+' where ';

        var keys=typeof Object.keys(conditions)=='string'?[Object.keys(conditions)]:Object.keys(conditions);
        keys.forEach(key=>{
            q+= `${key} = '${conditions[key]}' and ` 
        })
        q=q.slice(0,q.length-4)+';';
        // console.log(q);
        return await this.fatchdata(q);
    }
    delete=async(table,conditions)=>{
        var q=`delete from ${table} where `
        var keys=typeof Object.keys(conditions)=='string'?[Object.keys(conditions)]:Object.keys(conditions);
        keys.forEach(key=>{
            q+= `${key} = '${conditions[key]}' and ` 
        })
        q=q.slice(0,q.length-4)+';';
        return await this.fatchdata(q);
    }
}

// var obj=new connection('job_ap_dob_29')
//     obj.delete('yes',{can_id:1,edu_id:2})
module.exports=connection;