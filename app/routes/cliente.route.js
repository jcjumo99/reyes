const express = require('express');
const multer = require('../middlewares/multer');
const route = express.Router();
const clienteController = require('../controllers/cliente.controller');


route.get('/cliente',clienteController.getCliente);
route.post('/cliente',clienteController.CreateCliente)
//route.delete('/toro/:id',toroController.deleteToro)
//route.get('/toroId/:id',toroController.GetToroId)
//route.post('/toroId/:idToro',multer,toroController.UpdateToro)
//route.post('/toroIdVendido/:idToro',toroController.UpdateToroVendido)

module.exports= route;