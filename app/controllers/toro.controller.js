const toroController = {};
const toroModel = require('../models/toro.model');
const response = require('../helpers/response.helpers');




toroController.gettoro = async (req,res)=>{
    
    const toro =  await toroModel.getToro();
    return res.json(response.success('list toro',toro,'200'));

}

toroController.GetToroId = async (req,res)=>{
    const {id} = req.params;
    if(id.lenght === 0){
        return res.json(response.error('falta id',{},"400"))
    }else{
        const toro = await toroModel.getToroId(req.params);
        return res.json(response.success("ganado id ",toro,"200"))
    }
}
toroController.CreateToro = async (req,res)=>{
    const {color,peso,numero,estado} = req.body;
    //if(!req.file) return res.status(400).json(response.error('mandar imagen ',{},"400")); 
    if(!req.file){
        console.log(req.body)
        if(color &&  peso && numero && estado ){
            //req.body.imagen = filename;
            await toroModel.createToro(req.body);
            return res.json(response.success("ganado creado",req.body,"200"))
        }else{
            return res.status(400).json(response.error('faltan campos',{},"400"));   
        };
    }else{
        const {filename} = req.file;
        if(color &&  peso && numero && estado ){
            req.body.imagen = filename;
            //console.log("body",req.body)
            await toroModel.createToro(req.body);
            return res.json(response.success("ganado creado",req.body,"200"))
           
        }else{
            return res.status(400).json(response.error('faltan campos',{},"400")); 
             
        };
    }
    
    //console.log(req.body)
    
}
toroController.UpdateToro = async (req,res)=>{
    const {color,peso,numero,estado} = req.body;
    console.log(req.body)
    const {idToro} = req.params;
    //if(!req.file) return res.status(400).json(response.error('mandar imagen ',{},"400")); 
    if(!req.file){
        console.log("if")
        if( color &&  peso && numero && estado ){
            console.log("1",req.body)
            //req.body.imagen = filename;
            //req.body.idToro = req.params;
            console.log("2",req.body)
            await toroModel.updateToro(req.body,req.params);
            return res.json(response.success("ganado actualizado",req.body,"200"))
        }else{
            console.log("else")
            return res.status(400).json(response.error('faltan campos',{},"400"));   
        };
    }else{
        const {filename} = req.file;
        if(idToro && color &&  peso && numero && estado ){
            req.body.imagen = filename;
            //console.log("body",req.body)
            await toroModel.updateToro(req.body,req.params);
            return res.json(response.success("actualizado",req.body,"200"))
           
        }else{
            return res.status(400).json(response.error('faltan campos',{},"400")); 
             
        };
    }
    
    //console.log(req.body)
    
}
toroController.UpdateToroVendido = async (req,res)=>{
    const {idToro} = req.params;
    console.log(idToro)
   if(idToro){
    console.log("ifVendido")
    await toroModel.updateToroVendido(req.params);
    return res.json(response.success("ganado vendido",[],"200"))
   } 
        else{
            return res.status(400).json(response.error('faltan campos',{},"400"));   
        };
   
}
toroController.deleteToro = async (req,res)=>{
    console.log(req.params)
    const {id} = req.params;
    if(id.lenght === 0){
        return res.json(response.error('falta id ',{},"400"));
    }else{
        await toroModel.deleteToro(req.params);
        return res.json(response.success("ganado eliminado",{},"200"))
    }
}
module.exports = toroController;