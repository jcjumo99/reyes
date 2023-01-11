const express = require ('express');
const cors = require('cors');
const app = express();

const path = require ('path');

//imports
const toroRoute = require('./routes/toro.route')
const clienteRoute = require('./routes/cliente.route')

//connection
require('./connection/mysql');

//settings
const PORT = 4000;
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

//Routes
app.use(toroRoute);
app.use(clienteRoute);


//app.use('/public',express.static())
//app.use(express.static(__dirname));
app.use('/public/imagenes',express.static(path.resolve('public/imagenes')));
//console.log(__dirname)
//Listen Server
app.listen(PORT,()=>{
    console.log(`server on port ${PORT}`);
});
