const express = require('express');
const multer = require('../middlewares/multer');
const route = express.Router();
const comprasController = require('../controllers/compras.controller');


route.get('/compras',comprasController.getCompras);
route.post('/compras',comprasController.createCompras)
route.delete('/compras/:id',comprasController.deleteCompras)
route.get('/comprasId/:id',comprasController.getComprasId)


module.exports= route;