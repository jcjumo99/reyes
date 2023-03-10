const clienteModel = {};
const mysql = require ('../connection/mysql')

clienteModel.getCliente = async()=>{
    const sql = 'call sp_getClientes';
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

clienteModel.getClienteId = async (request)=>{
    const {id} = request
    const sql = 'call sp_getClienteId (?)'
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
clienteModel.createCliente = async(request)=>{
    const {direccion,telefono,nombres,apellidos} = request
    const sql = 'call sp_createCliente (?,?,?,?)';
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
clienteModel.updateCliente = async(request1,request2)=>{
    console.log(request1)

    const {direccion,telefono,nombres,apellidos} = request1
    const {idCliente}=request2
    const sql = 'call sp_editCliente (?,?,?,?,?)';
    const query = [idCliente,direccion,telefono,nombres,apellidos]
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
clienteModel.deleteCliente = (req,res) =>{
    const {id} = req;
    const sql = 'call sp_deleteCliente (?)';
    
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
module.exports = clienteModel;