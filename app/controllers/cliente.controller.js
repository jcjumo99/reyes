const clienteController = {};
const clienteModel = require('../models/cliente.model');
const response = require('../helpers/response.helpers');




clienteController.getCliente = async (req,res)=>{
    
    const cliente =  await clienteModel.getCliente();
    return res.json(response.success('list cliente',cliente,'200'));

}

clienteController.GetClienteId = async (req,res)=>{
    const {id} = req.params;
    if(id.lenght === 0){
        return res.json(response.error('falta id',{},"400"))
    }else{
        const cliente = await clienteModel.getClienteId(req.params);
        return res.json(response.success("cliente id ",cliente,"200"))
    }
}
clienteController.CreateCliente = async (req,res)=>{
    const {direccion,telefono,nombres,apellidos} = req.body;
    console.log(req.body)
        if(direccion && telefono && nombres && apellidos ){
           
            await clienteModel.createCliente(req.body);
            return res.json(response.success("cliente creado",req.body,"200"))
        }else{
            return res.status(400).json(response.error('faltan campos',{},"400"));   
        };
    
}
clienteController.UpdateCliente = async (req,res)=>{
    const {direccion,telefono,nombres,apellidos} = req.body;
    console.log(req.body)
    const {idCliente} = req.params;
        if( idCliente && direccion &&  telefono && nombres && apellidos ){
            console.log("1",req.body)
            //req.body.imagen = filename;
            //req.body.idToro = req.params;
            console.log("2",req.body)
            await clienteModel.updateCliente(req.body,req.params);
            return res.json(response.success("cliente actualizado",req.body,"200"))
        }else{
            console.log("else")
            return res.status(400).json(response.error('faltan campos',{},"400"));   
        };
  
    
}

clienteController.deleteCliente = async (req,res)=>{
    console.log(req.params)
    const {id} = req.params;
    if(id.lenght === 0){
        return res.json(response.error('falta id ',{},"400"));
    }else{
        await clienteModel.deleteCliente(req.params);
        return res.json(response.success("Cliente eliminado",{},"200"))
    }
}
module.exports = clienteController;