const express = require('express');
const route = express.Router();
const cobranzaController = require('../controllers/cobranza.controller');


route.get('/cobranza',cobranzaController.getCobranza);
route.post('/cobranza',cobranzaController.CreateCobranza);
route.post('/pago',cobranzaController.CreatePago);
//route.delete('/toro/:id',toroController.deleteToro)
//route.get('/toroId/:id',toroController.GetToroId)
route.post('/cobranzaDetalle',cobranzaController.getDetalleCobranza);
//route.post('/toroIdVendido/:idToro',toroController.UpdateToroVendido)

module.exports= route;