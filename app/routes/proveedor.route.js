const express = require('express');
const multer = require('../middlewares/multer');
const route = express.Router();
const proveedorController = require('../controllers/proveedor.controller');


route.get('/proveedor',proveedorController.getProveedores);
route.post('/proveedor',proveedorController.CreateProveedor)
route.delete('/proveedor/:id',proveedorController.deleteProveedor)
route.get('/proveedorId/:id',proveedorController.getProveedoresId)
route.post('/proveedor/:idProveedor',multer,proveedorController.UpdateProveedor)


module.exports= route;