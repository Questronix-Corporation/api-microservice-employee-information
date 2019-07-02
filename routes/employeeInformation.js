const TAG        = '[employeeInformation]';
const express    = require('express');
const rekuire    = require('rekuire');
const async      = require('async');
const Logger     = rekuire('Logger');
const router     = express.Router();
const fs        = require('fs');

const EmployeeInformationController = rekuire('EmployeeInformationController');

router.post('/employees/company/info', function(req, res, next){
    var ACTION = '[addCompanyInfo]';
    Logger.log('debug', TAG + ACTION + ' request body', req.body);

    var _employeeInformation = new EmployeeInformationController(req);
    async.auto({
        chkEmployeeNo:      _employeeInformation.chkEmployeeNo.bind(_employeeInformation),
        addCompanyInfo:      ['chkEmployeeNo', _employeeInformation.addCompanyInfo.bind(_employeeInformation)]
    }, function(err, result) {
        if(err) return res.error(err);
        else return res.ok(result.addCompanyInfo);
    });
});

router.post('/employees/bank/info', function(req, res, next){
    var ACTION = '[addBankInfo]';
    Logger.log('debug', TAG + ACTION + ' request body', req.body);

    var _employeeInformation = new EmployeeInformationController(req);
    async.auto({
        chkEmployeeNo:      _employeeInformation.chkEmployeeNo.bind(_employeeInformation),
        chkBankInfo:      ['chkEmployeeNo', _employeeInformation.chkBankInfo.bind(_employeeInformation)],
        addBankInfo:      ['chkEmployeeNo', 'chkBankInfo', _employeeInformation.addBankInfo.bind(_employeeInformation)]
    }, function(err, result) {
        if(err) return res.error(err);
        else return res.ok(result.addBankInfo);
    });
});

router.post('/employees/legal/info', function(req, res, next){
    var ACTION = '[addLegalInfo]';
    Logger.log('debug', TAG + ACTION + ' request body', req.body);

    var _employeeInformation = new EmployeeInformationController(req);
    async.auto({
        chkEmployeeNo:      _employeeInformation.chkEmployeeNo.bind(_employeeInformation),
        chkLegalInfo:      ['chkEmployeeNo', _employeeInformation.chkLegalInfo.bind(_employeeInformation)],
        addLegalInfo:      ['chkEmployeeNo', 'chkLegalInfo', _employeeInformation.addLegalInfo.bind(_employeeInformation)]
    }, function(err, result) {
        if(err) return res.error(err);
        else return res.ok(result.addLegalInfo);
    });
});

module.exports = router;