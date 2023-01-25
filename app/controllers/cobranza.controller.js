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
cobranzaController.CreateCobranza = async (req,res)=>{
    const {cliente,cantidad,estado,pago,peso,precioKilo,total} = req.body;
    console.log(req.body)
        if(cliente,cantidad,estado,pago,peso,precioKilo,total){
            await cobranzaModel.createCobranza(req.body);
            return res.json(response.success("venta creado",req.body,"200"))
        }else{
            return res.status(400).json(response.error('faltan campos',{},"400"));   
        };
    
}

cobranzaController.CreatePago = async (req,res)=>{
    const {idVenta,pago} = req.body;
    console.log(req.body)
        if(idVenta,pago){
            await cobranzaModel.createpago(req.body);
            return res.json(response.success("pago creado",{},"200"))
        }else{
            return res.status(400).json(response.error('faltan campos',{},"400"));   
        };
    
}
cobranzaController.getDetalleCobranza = async (req,res)=>{
    console.log(req)
    const {idcobranza} = req.body;
    console.log()
        if(idcobranza){
           const respuesta =  await cobranzaModel.getDetalleCobranza(req.body);
            return res.json(response.success("detalle list",respuesta,"200"))
        }else{
            console.log("else")
            return res.status(400).json(response.error('faltan campos',{},"400"));   
        };
  
    
}

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