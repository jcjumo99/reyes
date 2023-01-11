const express = require('express');
const multer = require('../middlewares/multer');
const route = express.Router();
const toroController = require('../controllers/toro.controller');


route.get('/toro',toroController.gettoro);
route.post('/toro',multer,toroController.CreateToro)
route.delete('/toro/:id',toroController.deleteToro)
route.get('/toroId/:id',toroController.GetToroId)
route.post('/toroId/:idToro',multer,toroController.UpdateToro)
route.post('/toroIdVendido/:idToro',toroController.UpdateToroVendido)

module.exports= route;