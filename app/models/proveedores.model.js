const proveedoresModel = {};
const mysql = require ('../connection/mysql')

proveedoresModel.getProveedores = async()=>{
    const sql = 'call sp_getProveedores';
    const promise = new Promise ((resolve,reject)=>{
        mysql.query(sql,[],(err,result)=>{
            if(err)
                reject(err);
            else
                resolve(result[0]);
        });
    });
    return  promise.then(resp=>{
        return resp;
    }).catch(err=>{
        return err;
    })
}

proveedoresModel.getProveedoresId = async (request)=>{
    const {id} = request
    const sql = 'call sp_getProveedorId (?)'
    const query = [id]
    const promise = new Promise((resolve,reject)=>{
        mysql.query(sql,query,(err,result)=>{
            if(err)
                reject(err);
            else
                resolve(result[0]);
        });
    });
    return promise.then(resp=>{
        return resp;
    }).catch(err=>{
        return err;
    })
}
proveedoresModel.createProveedor = async(request)=>{
    const {direccion,telefono,nombres,apellidos} = request
    const sql = 'call sp_createProveedor (?,?,?,?)';
    const query = [direccion,telefono,nombres,apellidos]
    const promise = new Promise ((resolve,reject)=>{
        mysql.query(sql,query,(err,result)=>{
            if(err)
                reject(err);
            else
                resolve(result);
        });
    });
    return promise.then(resp=>{
        return resp;
    }).catch(err=>{
        return err;
    })
}
proveedoresModel.updateProveedor = async(request1,request2)=>{
    console.log(request1)

    const {direccion,telefono,nombres,apellidos} = request1
    const {idProveedor}=request2
    const sql = 'call sp_editProveedor (?,?,?,?,?)';
    const query = [idProveedor,direccion,telefono,nombres,apellidos]
    console.log(query)
    const promise = new Promise ((resolve,reject)=>{
        mysql.query(sql,query,(err,result)=>{
            if(err)
                reject(err);
            else
                resolve(result);
        });
    });
    return promise.then(resp=>{
        return resp;
    }).catch(err=>{
        return err;
    })
}
proveedoresModel.deleteProveedor = (req,res) =>{
    const {id} = req;
    const sql = 'call sp_deleteProveedor (?)';
    
    const promise = new Promise ((resolve,reject)=>{
        mysql.query(sql,[id],(err,result)=>{
            if(err)
               reject(err);
            else    
                resolve(result); 
        });
    });
    return promise.then(resp=>{
        return resp;
    }).catch(err=>{
        return err;
    })


}
module.exports = proveedoresModel;