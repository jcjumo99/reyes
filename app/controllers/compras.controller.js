const comprasController = {};
const comprasModel = require('../models/compras.model');
const response = require('../helpers/response.helpers');




comprasController.getCompras = async (req,res)=>{
    
    const compras =  await comprasModel.getCompras();
    return res.json(response.success('list compras',compras,'200'));

}

comprasController.getComprasId = async (req,res)=>{
    const {id} = req.params;
    if(id.lenght === 0){
        return res.json(response.error('falta id',{},"400"))
    }else{
        const compras = await comprasModel.getComprasId(req.params);
        return res.json(response.success("compras id ",compras,"200"))
    }
}
comprasController.createCompras = async (req,res)=>{
    const {proveedor,kilos,preciokg,cantidad, total, pago,estado} = req.body;
    console.log(req.body)
        if(proveedor && kilos && preciokg && cantidad && total && pago && estado ){
            console.log("if",req.body)
            await comprasModel.createCompras(req.body);
            return res.json(response.success("compra creada",req.body,"200"))
        }else{
            return res.status(400).json(response.error('faltan campos',{},"400"));   
        };
    
}


comprasController.deleteCompras = async (req,res)=>{
    console.log(req.params)
    const {id} = req.params;
    if(id.lenght === 0){
        return res.json(response.error('falta id ',{},"400"));
    }else{
        await comprasModel.deleteCompras(req.params);
        return res.json(response.success("Compra eliminada",{},"200"))
    }
}
module.exports = comprasController;