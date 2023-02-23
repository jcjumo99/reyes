const express = require('express');
const multer = require('../middlewares/multer');
const route = express.Router();
const clienteController = require('../controllers/cliente.controller');
const jwt = require('../middlewares/token.middlewares');

route.get('/cliente',jwt.validate,clienteController.getCliente);
route.post('/cliente',jwt.validate,clienteController.CreateCliente)
route.delete('/cliente/:id',jwt.validate,clienteController.deleteCliente)
route.get('/clienteId/:id',jwt.validate,clienteController.GetClienteId)
route.post('/cliente/:idCliente',multer,jwt.validate,clienteController.UpdateCliente)


module.exports= route;