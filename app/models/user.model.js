
const userModel = {};
const mysql = require ('../connection/mysql')


userModel.buscarUser = async (username) => {
const sql= 'select * from users where username=?';
    const query = username;
    const promise = new Promise ((resolve,reject)=>{
        mysql.query(sql,query,(err,result)=>{
            if(err)
                reject(err);
            else
                resolve(result);
        });
    });

    return await promise.then(resp=>{
        return resp;
    }).catch(err=>{
        return err;
    });
}

module.exports = userModel;