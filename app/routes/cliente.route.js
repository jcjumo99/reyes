const express = require('express');
const multer = require('../middlewares/multer');
const route = express.Router();
const clienteController = require('../controllers/cliente.controller');


route.get('/cliente',clienteController.getCliente);
route.post('/cliente',clienteController.CreateCliente)
route.delete('/cliente/:id',clienteController.deleteCliente)
route.get('/clienteId/:id',clienteController.GetClienteId)
route.post('/cliente/:idCliente',multer,clienteController.UpdateCliente)


module.exports= route;