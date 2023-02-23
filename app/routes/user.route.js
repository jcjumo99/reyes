const express = require('express');
const route = express.Router();
const userController = require('../controllers/user.controller');



route.post('/user',userController.login)


module.exports= route;