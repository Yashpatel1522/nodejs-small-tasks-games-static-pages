const { query } = require('express')
const mysql=require('mysql')


class database{

    constructor(db)
    {
        this.con=mysql.createConnection({
            user:"root",
            host:"localhost",
            password:"",
            database:db            
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
            console.log("adadadadadadadadadaadasdadd",err);
            return err.sqlMessage;
        })
        return result;
     }




}


module.exports=database;