'use strict';

const TAG     = '[EmployeeInformationController]';
const rekuire = require('rekuire');
const Logger  = rekuire('Logger');
const Errors  = rekuire('Errors');
// const EmployeeInformation   = rekuire('EmployeeInformation');
const EmployeeInformationMySQL = rekuire('EmployeeInformationMySQL');

function EmployeeInformationController(req, res) {
	this.req = req;
	this.res = res;
};

// Create New Account
EmployeeInformationController.prototype.addEmployee = function(cb, result) {
    let ACTION = '[addEmployee]';

    let query = `INSERT INTO EmployeeInformation SET ?`;
    let addEmployee = EmployeeInformationMySQL.execute(query, this.req.body);
    addEmployee.then((account)=>{
        return cb(null, {
            "message": "Employee successfully added"
        });
    }).catch((error)=>{
		Logger.log('error', TAG + ACTION, error);
		return cb(Errors.raise('INTERNAL_SERVER_ERROR', error));
	});
};

module.exports = EmployeeInformationController;