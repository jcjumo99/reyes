const mysql = require('mysql');
require('dotenv').config()

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'falonso01',
    database: 'bd_reyes'
});
mysqlConnection.connect((err,result)=>{
    if(err)
        console.log(err);
    else
        console.log('database connected');
    
});

module.exports=mysqlConnection;
