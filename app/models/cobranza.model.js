const cobranzaModel = {};
const mysql = require ('../connection/mysql')

cobranzaModel.getCobranza = async()=>{
    const sql = 'select * from cobranza';
    const promise = new Promise ((resolve,reject)=>{
        mysql.query(sql,[],(err,result)=>{
            if(err)
                reject(err);
            else
                resolve(result);
        });
    });
    return  promise.then(resp=>{
        return resp;
    }).catch(err=>{
        return err;
    })
}


// cobranzaModel.createCliente = async(request)=>{
//     const {direccion,telefono,nombres,apellidos} = request
//     const sql = 'call sp_createCliente (?,?,?,?)';
//     const query = [direccion,telefono,nombres,apellidos]
//     const promise = new Promise ((resolve,reject)=>{
//         mysql.query(sql,query,(err,result)=>{
//             if(err)
//                 reject(err);
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
// toroModel.updateToro = async(request1,request2)=>{
   
//     const {color,peso,numero,estado,imagen} = request1
//     const {idToro}=request2
//     const sql = 'call sp_editToro (?,?,?,?,?,?)';
//     const query = [idToro,color,peso,numero,estado,imagen]
//     console.log(query)
//     const promise = new Promise ((resolve,reject)=>{
//         mysql.query(sql,query,(err,result)=>{
//             if(err)
//                 reject(err);
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