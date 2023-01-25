const cobranzaController = {};
const cobranzaModel = require('../models/cobranza.model');
const response = require('../helpers/response.helpers');




cobranzaController.getCobranza = async (req,res)=>{
    
    const cobranza =  await cobranzaModel.getCobranza();
    return res.json(response.success('list cobranza',cobranza,'200'));

}

// toroController.GetToroId = async (req,res)=>{
//     const {id} = req.params;
//     if(id.lenght === 0){
//         return res.json(response.error('falta id',{},"400"))
//     }else{
//         const toro = await toroModel.getToroId(req.params);
//         return res.json(response.success("ganado id ",toro,"200"))
//     }
// }
// cobranzaController.CreateCliente = async (req,res)=>{
//     const {direccion,telefono,nombres,apellidos} = req.body;
//     console.log(req.body)
//         if(direccion && telefono && nombres && apellidos ){
           
//             await clienteModel.createCliente(req.body);
//             return res.json(response.success("cliente creado",req.body,"200"))
//         }else{
//             return res.status(400).json(response.error('faltan campos',{},"400"));   
//         };
    
//}
// toroController.UpdateToro = async (req,res)=>{
//     const {color,peso,numero,estado} = req.body;
//     console.log(req.body)
//     const {idToro} = req.params;
//         if( color &&  peso && numero && estado ){
//             console.log("1",req.body)
//             //req.body.imagen = filename;
//             //req.body.idToro = req.params;
//             console.log("2",req.body)
//             await toroModel.updateToro(req.body,req.params);
//             return res.json(response.success("ganado actualizado",req.body,"200"))
//         }else{
//             console.log("else")
//             return res.status(400).json(response.error('faltan campos',{},"400"));   
//         };
  
    
// }

// toroController.deleteToro = async (req,res)=>{
//     console.log(req.params)
//     const {id} = req.params;
//     if(id.lenght === 0){
//         return res.json(response.error('falta id ',{},"400"));
//     }else{
//         await toroModel.deleteToro(req.params);
//         return res.json(response.success("ganado eliminado",{},"200"))
//     }
// }
module.exports = cobranzaController;