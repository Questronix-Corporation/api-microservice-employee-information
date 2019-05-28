'use strict';

const TAG     = '[EmployeeInformationController]';
const rekuire = require('rekuire');
const Logger  = rekuire('Logger');
const Errors  = rekuire('Errors');

const employee_information_model = rekuire('employeeinformation');

function EmployeeInformationController(req, res) {
	this.req = req;
	this.res = res;
};

// Add Company Info
EmployeeInformationController.prototype.addCompanyInfo = function(cb, result) {
    let ACTION = '[addEmployee]';
    
    let data = {
        employee_no: this.req.body.employeeNo,
        last_name: this.req.body.lastName,
        first_name: this.req.body.firstName,
        middle_name: this.req.body.middleName,
        rank: this.req.body.rank,
    };

    let addCompanyInfo = employee_information_model.addCompanyInfo(data);
    addCompanyInfo.then((companyInfo)=>{
        return cb(null, {
            message: 'Successfully added Company Info.'
        });
    }).catch((error) => {
        Logger.log('error', TAG + ACTION, error);
        return cb(Errors.raise('INTERNAL_SERVER_ERROR', error));
    });
};

module.exports = EmployeeInformationController;