const mysql = require("mysql2/promise");
async function connect(){
    if(global.connection && global.connection.state !== 'disconnected'){
        //console.log("MySql Connection Recovered");
        return global.connection;
    }
    const connection = await mysql.createConnection("mysql://Admin:Admin@123@grafana-server:3306/_mysql");
    //console.log("MySql Connection Started");
    global.connection = connection;
    return connection;
}
module.exports = {connect}