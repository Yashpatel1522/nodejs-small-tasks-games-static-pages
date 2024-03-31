const mysql=require('mysql');

class database{

    constructor(db)
    {
        this.user=process.env.user;
        this.host=process.env.host;
        this.password=process.env.password;
        this.database=db;
        
    }
    connection()
    {
        var con=mysql.createConnection({
            user:this.user,
            host:this.host,
            password:this.password,
            database:this.database,
            dateStrings:true
        })
        var res= new Promise((resolve,reject)=>{
            con.connect((err)=>{
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve(con)
                }
            })
        })
        
        var res=res.then(data=>{
            return data
        }).catch(err=>{
            return err.sqlMessage; 
        })
        return res;
    }
    
    executrquery=async(q)=>{
        var con=await this.connection()
        var res=new Promise((resolve,reject)=>{
            var res=con.query(q,(err,result)=>{
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve(result)
                }
            })
        })    
        var res=res.then(data=>{
            return(data)
        }).catch(err=>{
            return err.sqlMessage;
        })
        return res;
    }

    fatchdata2=async(table,id)=>{
        var con=await this.connection()
        var q=`select * from ${table} where candidate_id=${id}`;
        console.log(q);
        let result=  new Promise((resolve,reject)=>{
              con.query(q,(err,result)=>{
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

    insertdata=async(data,table)=>{
        var keys=Object.keys(data);
        var q=`insert into ${table}(`;
        keys.forEach(key => {
            q+=`${key},`
        });
        q=q.slice(0,q.length-1)+')values(';
        keys.forEach(key=>{
            q+=`'${data[key]}',`;   
        })
        q=q.slice(0,q.length-1)+');'
        // console.log(q);
        return await this.executrquery(q);
    }

    update=async(data,table,conditions)=>{
        var q=`update ${table} set `
        Object.keys(data).forEach(key=>{
            q+=`${key}='${data[key]}',`
        })
        q=q.slice(0,q.length-1)+' where ';
        Object.keys(conditions).forEach(key=>{
            q+=`${key}='${conditions[key]}' and `;
        })
        q=q.slice(0,q.length-5)+`;`
        console.log(q)
        return await this.executrquery(q);
    }
    update2=async(data,table,conditions)=>{
        var q=`update ${table} set `
        Object.keys(data).forEach(key=>{
            if(data[key]==null)
            {
                q+=`${key}=${data[key]},`
            }
            else
            {
                q+=`${key}='${data[key]}',`
            }
        })
        q=q.slice(0,q.length-1)+' where ';
        Object.keys(conditions).forEach(key=>{
            q+=`${key}='${conditions[key]}' or `;
        })
        q=q.slice(0,q.length-4)+`;`
        console.log(q)
        return await this.executrquery(q);
    }
    
    
    delete=async(table,conditions)=>{
        var q=`delete from ${table} where `
        Object.keys(conditions).forEach(key=>{
            q+=`${key}='${conditions[key]}' and `;
        })
        q=q.slice(0,q.length-5)+';'
        console.log(q)
        return await this.executrquery(q);
    }
}
module.exports=database;