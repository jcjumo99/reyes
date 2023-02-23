const express = require('express');
const multer = require('../middlewares/multer');
const route = express.Router();
const comprasController = require('../controllers/compras.controller');
const jwt = require('../middlewares/token.middlewares');

route.get('/compras',jwt.validate,comprasController.getCompras);
route.post('/compras',jwt.validate,comprasController.createCompras)
route.delete('/compras/:id',jwt.validate,comprasController.deleteCompras)
route.get('/comprasId/:id',jwt.validate,comprasController.getComprasId)


module.exports= route;