'use strict';

var mysql = require('../services/EmployeeInformationMySQL');

//Select employee no
exports.chkEmployeeNo = (data) => {
    return new Promise((resolve, reject)=>{
        mysql.execute('SELECT * FROM company_info WHERE employee_no = ?', data)
        .then((data)=>{
            resolve(data);
        }).catch((error)=>{
            reject(error);
        });
    });
};

//Add company info
exports.addCompanyInfo = (data) => {
    return new Promise((resolve, reject)=>{
        mysql.execute('INSERT INTO company_info SET ?', data)
        .then((data)=>{
            resolve(data);
        }).catch((error)=>{
            reject(error);
        });
    });
};

//Check bank info
exports.chkBankInfo = (data) => {
    return new Promise((resolve, reject)=>{
        mysql.execute('SELECT * FROM bank_info WHERE employee_no = ?', data)
        .then((data)=>{
            resolve(data);
        }).catch((error)=>{
            reject(error);
        });
    });
};

//Add bank info
exports.addBankInfo = (data) => {
    return new Promise((resolve, reject)=>{
        mysql.execute('INSERT INTO bank_info SET ?', data)
        .then((data)=>{
            resolve(data);
        }).catch((error)=>{
            reject(error);
        });
    });
};

//Check legal info
exports.chkLegalInfo = (data) => {
    return new Promise((resolve, reject)=>{
        mysql.execute('SELECT * FROM legal_info WHERE employee_no = ?', data)
        .then((data)=>{
            resolve(data);
        }).catch((error)=>{
            reject(error);
        });
    });
};

//Add legal info
exports.addLegalInfo = (data) => {
    return new Promise((resolve, reject)=>{
        mysql.execute('INSERT INTO legal_info SET ?', data)
        .then((data)=>{
            resolve(data);
        }).catch((error)=>{
            reject(error);
        });
    });
};