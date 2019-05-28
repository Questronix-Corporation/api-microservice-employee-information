const TAG        = '[employeeInformation]';
const express    = require('express');
const rekuire    = require('rekuire');
const async      = require('async');
const Logger     = rekuire('Logger');
const router     = express.Router();
const fs        = require('fs');

const EmployeeInformationController = rekuire('EmployeeInformationController');

router.post('/register', function(req, res, next){
    var ACTION = '[registerEmployee]';
    Logger.log('debug', TAG + ACTION + ' request body', req.body);

    var _employeeInformation = new EmployeeInformationController(req);
    async.auto({
        addCompanyInfo:      _employeeInformation.addCompanyInfo.bind(_employeeInformation),
    }, function(err, result) {
        if(err) return res.error(err);
        else return res.ok(result.addCompanyInfo);
    });
});

module.exports = router;