const express = require('express');
const multer = require('../middlewares/multer');
const route = express.Router();
const toroController = require('../controllers/toro.controller');
const jwt = require('../middlewares/token.middlewares');

route.get('/toro',jwt.validate,toroController.gettoro);
route.post('/toro',multer,jwt.validate,toroController.CreateToro)
route.delete('/toro/:id',jwt.validate,toroController.deleteToro)
route.get('/toroId/:id',jwt.validate,toroController.GetToroId)
route.post('/toroId/:idToro',multer,jwt.validate,toroController.UpdateToro)
route.post('/toroIdVendido/:idToro',jwt.validate,toroController.UpdateToroVendido)

module.exports= route;