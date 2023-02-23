const express = require('express');
const route = express.Router();
const cobranzaController = require('../controllers/cobranza.controller');
const jwt = require('../middlewares/token.middlewares');

route.get('/cobranza',jwt.validate,cobranzaController.getCobranza);
route.post('/cobranza',jwt.validate,cobranzaController.CreateCobranza);
route.post('/pago',jwt.validate,cobranzaController.CreatePago);
//route.delete('/toro/:id',toroController.deleteToro)
//route.get('/toroId/:id',toroController.GetToroId)
route.post('/cobranzaDetalle',jwt.validate,cobranzaController.getDetalleCobranza);
//route.post('/toroIdVendido/:idToro',toroController.UpdateToroVendido)

module.exports= route;