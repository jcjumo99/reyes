const express = require('express');
const route = express.Router();
const cobranzaController = require('../controllers/cobranza.controller');


route.get('/cobranza',cobranzaController.getCobranza);
//route.post('/cliente',clienteController.CreateCliente)
//route.delete('/toro/:id',toroController.deleteToro)
//route.get('/toroId/:id',toroController.GetToroId)
//route.post('/toroId/:idToro',multer,toroController.UpdateToro)
//route.post('/toroIdVendido/:idToro',toroController.UpdateToroVendido)

module.exports= route;