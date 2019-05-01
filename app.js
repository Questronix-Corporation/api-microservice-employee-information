var rekuire = require('rekuire');
var Logger  = rekuire('Logger');
var Errors  = rekuire('Errors');
var express = require('express');
var app     = express();

require('dotenv').config();

var EmployeeInformationMySQL = rekuire('EmployeeInformationMySQL');
var express_configuration = require("./express-configuration");
express_configuration.init(app, express);

app.use('/v1/employee/information', require('./routes/employeeinformation'));

if(process.env.SKIP_QNX_MYSQL != 'true') {
  Logger.log('info', '[EmployeeInformationMySQLDB] Connecting to database');
  let mysqlConnect = EmployeeInformationMySQL.connect();
  mysqlConnect.then((connect)=>{
    Logger.log('info', '[EmployeeInformationMySQLDB] Database connected', connect);
  }).catch((error) => {
    Logger.log('error', '[EmployeeInformationMySQLDB] Database error in connection', error);
  });  
}

let port = process.env.PORT || 8085;
app.listen(port, function () {
	Logger.log('info', '[App] Now up and running', {port: port});
});


module.exports = app;
