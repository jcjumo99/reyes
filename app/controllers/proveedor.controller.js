const proveedorController = {};
const proveedoresModel = require('../models/proveedores.model');
const response = require('../helpers/response.helpers');




proveedorController.getProveedores = async (req,res)=>{
    
    const proveedores =  await proveedoresModel.getProveedores();
    return res.json(response.success('list proveedores',proveedores,'200'));

}

proveedorController.getProveedoresId = async (req,res)=>{
    const {id} = req.params;
    if(id.lenght === 0){
        return res.json(response.error('falta id',{},"400"))
    }else{
        const proveedores = await proveedoresModel.getProveedoresId(req.params);
        return res.json(response.success("proveedor id ",proveedores,"200"))
    }
}
proveedorController.CreateProveedor = async (req,res)=>{
    const {direccion,telefono,nombres,apellidos} = req.body;
    console.log(req.body)
        if(direccion && telefono && nombres && apellidos ){
           
            await proveedoresModel.createProveedor(req.body);
            return res.json(response.success("proveedor creado",req.body,"200"))
        }else{
            return res.status(400).json(response.error('faltan campos',{},"400"));   
        };
    
}
proveedorController.UpdateProveedor = async (req,res)=>{
    const {direccion,telefono,nombres,apellidos} = req.body;
    console.log(req.body)
    const {idProveedor} = req.params;
        if( idProveedor && direccion &&  telefono && nombres && apellidos ){
            console.log("1",req.body)
            //req.body.imagen = filename;
            //req.body.idToro = req.params;
            console.log("2",req.body)
            await proveedoresModel.updateProveedor(req.body,req.params);
            return res.json(response.success("Proveedor actualizado",req.body,"200"))
        }else{
            console.log("else")
            return res.status(400).json(response.error('faltan campos',{},"400"));   
        };
  
    
}

proveedorController.deleteProveedor = async (req,res)=>{
    console.log(req.params)
    const {id} = req.params;
    if(id.lenght === 0){
        return res.json(response.error('falta id ',{},"400"));
    }else{
        await proveedoresModel.deleteProveedor(req.params);
        return res.json(response.success("Proveedor eliminado",{},"200"))
    }
}
module.exports = proveedorController;