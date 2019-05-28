'use strict';

var mysql = require('../services/EmployeeInformationMySQL');

exports.addCompanyInfo = (data) => {
    return new Promise((resolve, reject)=>{
        mysql.execute('INSERT INTO employee_company_info SET ?', data)
        .then((data)=>{
            resolve(data);
        }).catch((error)=>{
            reject(error);
        });
    });
};