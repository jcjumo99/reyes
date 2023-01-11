const toroModel = {};
const mysql = require ('../connection/mysql')

toroModel.getToro = async()=>{
    const sql = 'call sp_getToros';
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

toroModel.getToroId = async (request)=>{
    const {id} = request
    const sql = 'call sp_getToroId (?)'
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
toroModel.createToro = async(request)=>{
    const {color,peso,numero,estado,imagen} = request
    const sql = 'call sp_createToro (?,?,?,?,?)';
    const query = [color,peso,numero,estado,imagen]
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
toroModel.updateToro = async(request1,request2)=>{
   
    const {color,peso,numero,estado,imagen} = request1
    const {idToro}=request2
    const sql = 'call sp_editToro (?,?,?,?,?,?)';
    const query = [idToro,color,peso,numero,estado,imagen]
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
toroModel.updateToroVendido = async(request)=>{
   
    const {idToro}=request
    const sql = 'call sp_editToroVendido (?)';
    const query = [idToro]
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
toroModel.deleteToro = (req,res) =>{
    const {id} = req;
    const sql = 'call sp_deleteToro (?)';
    
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
module.exports = toroModel;