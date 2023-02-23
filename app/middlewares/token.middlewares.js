const jwt = {};
const response = require('../helpers/response.helpers');
const jwbt = require('jsonwebtoken');
const secret = 'reyes#2023[</>]';

jwt.validate = (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization) {
        try {
            const auth = authorization.replace("Bearer ","")
            console.log(auth)
            const decoded = jwbt.verify(auth, secret);
            console.log("decoded_2",decoded)
            //req.miToken = decoded;

            
            next();
        } catch (error) {
            return res.json(response.error("Authorization denied",{},"400"));
        }
        
    } else {
        return res.json(response.error("Authorization not found",{},"400"));
    }
}

module.exports = jwt;