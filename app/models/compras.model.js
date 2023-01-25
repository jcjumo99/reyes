const comprasModel = {};
const mysql = require ('../connection/mysql')

comprasModel.getCompras = async()=>{
    const sql = 'call sp_getCompras';
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

comprasModel.getComprasId = async (request)=>{
    const {id} = request
    const sql = 'call sp_getComprasId (?)'
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
comprasModel.createCompras = async(request)=>{
    const {proveedor,kilos,preciokg,cantidad, total, pago, estado} = request
    const sql = 'call sp_createCompras (?,?,?,?,?,?,?)';
    const query = [proveedor,kilos,preciokg,cantidad, total, pago,estado]
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
comprasModel.deleteCompras = (req,res) =>{
    const {id} = req;
    const sql = 'call sp_deleteCompras (?)';
    
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
module.exports = comprasModel;