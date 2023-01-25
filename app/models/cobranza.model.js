const cobranzaModel = {};
const mysql = require ('../connection/mysql')

cobranzaModel.getCobranza = async()=>{
    const sql = 'call sp_getVentas';
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


cobranzaModel.createCobranza = async(request)=>{
    const {cliente,cantidad,estado,pago,peso,precioKilo,total} = request
    const sql = 'call sp_createVenta (?,?,?,?,?,?,?)';
    const query = [cliente,cantidad,estado,pago,peso,precioKilo,total]
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

cobranzaModel.createpago = async(request)=>{
    const {idVenta,pago} = request
    const sql = 'call sp_pagoVenta (?,?)';
    const query = [idVenta,pago]
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
cobranzaModel.getDetalleCobranza = async(request1)=>{
   
    const {idcobranza} = request1
    const sql = 'call sp_getIdDetalleVenta (?)';
    const query = [idcobranza]
    const promise = new Promise ((resolve,reject)=>{
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
// toroModel.deleteToro = (req,res) =>{
//     const {id} = req;
//     const sql = 'call sp_deleteToro (?)';
    
//     const promise = new Promise ((resolve,reject)=>{
//         mysql.query(sql,[id],(err,result)=>{
//             if(err)
//                reject(err);
//             else    
//                 resolve(result); 
//         });
//     });
//     return promise.then(resp=>{
//         return resp;
//     }).catch(err=>{
//         return err;
//     })


// }
module.exports = cobranzaModel;