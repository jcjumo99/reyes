const express = require('express');
const multer = require('../middlewares/multer');
const route = express.Router();
const proveedorController = require('../controllers/proveedor.controller');
const jwt = require('../middlewares/token.middlewares');

route.get('/proveedor',jwt.validate,proveedorController.getProveedores);
route.post('/proveedor',jwt.validate,proveedorController.CreateProveedor)
route.delete('/proveedor/:id',jwt.validate,proveedorController.deleteProveedor)
route.get('/proveedorId/:id',jwt.validate,proveedorController.getProveedoresId)
route.post('/proveedor/:idProveedor',multer,jwt.validate,proveedorController.UpdateProveedor)


module.exports= route;