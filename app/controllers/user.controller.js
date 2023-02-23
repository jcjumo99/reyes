const userController = {};
const userModel = require("../models/user.model");
const response = require("../helpers/response.helpers");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


userController.login = async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    const user = await userModel.buscarUser(username);
    if(user.length > 0){
        const passEncrypt = user[0].password;
        //const passwordHash = await bcrypt.hash(password,8)
        const compareHash = await bcrypt.compare(password, passEncrypt);
    if (compareHash) {
        const data = user[0]
            const payload = {
                id_user:data.id_user,
                apellido:data.apellido,
                nombre:data.nombre,
                username:data.username,
                password:data.password
            }  
        
        const token = jwt.sign(payload,'reyes#2023[</>]',{expiresIn: '3h'})
        const accessToken = {access_token : token}

        return res.status(200).json(response.success("exito", accessToken, "200"));

    } else {
        return res.status(403).json(response.error("credenciales incorrectas", {},"403"));
    }
    }else{
        return res.status(403).json(response.error("credenciales incorrectas", {},"403"));
    }
    
  } else {
    return res.status(400).json(response.error("faltan campos", {}, "400"));
  }
};

module.exports = userController;
