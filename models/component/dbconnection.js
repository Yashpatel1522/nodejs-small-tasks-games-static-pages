const mysql=require('mysql');
class dbconnection
{
    constructor(db)
    {
        this.host="localhost";
        this.user="root";
        this.db=db;
        this.password=''
    }

    connection=async()=>{
        var con=mysql.createConnection({
            host:this.host,
            user:this.user,
            password:this.password,
            database:this.db
        })
        var result=new Promise((resolve,reject)=>{
                con.connect(err=>{
                    if(err)
                        reject(err);
                    else
                        resolve(con);
                })

        } )

        return await result.then((res)=>{
            return res;
        }).catch((err)=>{
            return(err.sqlMessage);
        })
    }

    executequery=async(q)=>{
        var con=await this.connection();
        console.log(con);
        var result=new Promise((resolve,reject)=>{
            con.query(q,(err,res)=>{
                if(err)reject(err);
                else resolve(res);
            })            
        })
        return await result.then((res)=>{
            return res;
        }).catch((err=>{    
            return (err.sqlMessage);
        }))
    }
}

module.exports=dbconnection;