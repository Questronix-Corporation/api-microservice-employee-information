'use strict';

const TAG     = '[EmployeeInformationController]';
const rekuire = require('rekuire');
const Logger  = rekuire('Logger');
const Errors  = rekuire('Errors');
const Moment  = rekuire('moment');
const async   = require('async');
const Utility = rekuire('Utility');

const employee_information_model = rekuire('employeeinformation');

function EmployeeInformationController(req, res) {
	this.req = req;
	this.res = res;
};

// Check Employee No
EmployeeInformationController.prototype.chkEmployeeNo = function(cb, result){
    let ACTION = '[chkEmployeeNo]';

    let employee_no = this.req.body.employeeNo;

    if(!employee_no){
        return cb(Errors.raise('MISSING_EMPLOYEE_NO'));
    }else{
        let chkEmployeeNo = employee_information_model.chkEmployeeNo(employee_no);
        chkEmployeeNo.then((data)=>{
            if(data.length > 0){
                return cb(null, data[0]);
            }else {
                return cb(null, {
                    message: "Employee No. not yet taken."
                });
            }
        }).catch((error) => {
            Logger.log('error', TAG + ACTION, error);
            return cb(Errors.raise('INTERNAL_SERVER_ERROR', error));
        });
    }
};

// Check Department and Section if Existing
EmployeeInformationController.prototype.chkDept = function(result, cb){
    let ACTION = '[chkDept]';

    if (cb == undefined) result = cb;

    let department_id = this.req.body.department.id;
    let section = this.req.body.department.section;

    let chkDept = employee_information_model.chkDept(department_id);
    chkDept.then((data)=>{
        var newData = data;
        if(newData.length > 0){
            return cb(null, {
                message: 'Department is existing.'
            });
        }else if(section == newData[0].){
            
        }else {
            return cb(Errors.raise('INVALID_DEPT_ID'));
        }
        // if(data.length > 0){
        //     return cb(null, data[0]);
        // }else {
        //     return cb(Errors.raise('INVALID_DEPT_ID'));
        // }
    }).catch((error) => {
        Logger.log('error', TAG + ACTION, error);
        return cb(Errors.raise('INTERNAL_SERVER_ERROR', error));
    });
};

// Add Company Info
EmployeeInformationController.prototype.addCompanyInfo = function(result, cb) {
    let ACTION = '[addEmployee]';

    if (cb == undefined) result = cb;

    if(!this.req.body.name || !this.req.body.company || !this.req.body.employment){
        return cb(Errors.raise('MISSING_INVALID_PARAMS'));
    }
    
    let data = {
        employee_no: this.req.body.employeeNo,
        last_name: this.req.body.name.last,
        first_name: this.req.body.name.first,
        middle_name: this.req.body.name.middle,
        rank: this.req.body.company.rank,
        job_level: this.req.body.company.jobLevel,
        position: this.req.body.company.position,
        phone_number: this.req.body.company.phoneNumber,
        department_id: this.req.body.department.id,
        section: this.req.body.department.section,
        status: this.req.body.employment.status || null,
        start_date: this.req.body.employment.startDate || null,
        reg_date: this.req.body.employment.regularizationDate || null,
        end_date: this.req.body.employment.endDate || null,
        created_at: Utility.generateDateNow()
    };

    console.log('------', data.created_at);

    let newData = [];

    if(!data.first_name){
        return cb(Errors.raise('MISSING_FIRST_NAME'));
    }

    if(data.start_date == null || data.start_date == ''){
        newData.push(data);
    }else {
        if(Moment(data.start_date, 'YYYY-MM-DD',true).isValid()){
            newData.push(data);
        }else{
            return cb(Errors.raise('INVALID_START_DATE'));
        }
    }

    if(data.reg_date == null || data.reg_date == ''){
        newData.push(data);
    }else {
        if(Moment(data.reg_date, 'YYYY-MM-DD',true).isValid()){
            newData.push(data);
        }else{
            return cb(Errors.raise('INVALID_REG_DATE'));
        }
    }

    if(data.end_date == null || data.end_date == ''){
        newData.push(data);
    }else {
        if(Moment(data.end_date, 'YYYY-MM-DD',true).isValid()){
            newData.push(data);
        }else{
            return cb(Errors.raise('INVALID_END_DATE'));
        }
    }

    if(result.chkEmployeeNo.message){
        let addCompanyInfo = employee_information_model.addCompanyInfo(newData[0]);
        addCompanyInfo.then((data)=>{
            return cb(null, {
                message: 'Successfully added Company Info.'
            });
        }).catch((error) => {
            Logger.log('error', TAG + ACTION, error);
            return cb(Errors.raise('INTERNAL_SERVER_ERROR', error));
        });
    }else {
        return cb(Errors.raise('EMPLOYEE_NO_TAKEN'));
    }
};

// Check Bank Info is Existing
EmployeeInformationController.prototype.chkBankInfo = function(result, cb){
    let ACTION = '[chkBankInfo]';

    if (cb == undefined) result = cb;

    if(result.chkEmployeeNo.employee_no){
        let chkBankInfo = employee_information_model.chkBankInfo(result.chkEmployeeNo.employee_no);
        chkBankInfo.then((data)=>{
            if(data.length > 0){
                return cb(Errors.raise('BANK_INFO_EMPLOYEE_NO_EXISTING'));
            }else {
                return cb(null, {
                    employee_no: this.req.body.employeeNo,
                    bank: this.req.body.bank,
                    account_no: this.req.body.accountNo
                });
            }
        }).catch((error) => {
            Logger.log('error', TAG + ACTION, error);
            return cb(Errors.raise('INTERNAL_SERVER_ERROR', error));
        });
    }else{
        return cb(Errors.raise('NOT_FOUND_EMPLOYEE_NO'));
    }
    
}

// Add Bank Info
EmployeeInformationController.prototype.addBankInfo = function(result, cb){
    let ACTION = '[addBankInfo]';

    if (cb == undefined) result = cb;

    if(result.chkBankInfo.employee_no){
        let addBankInfo = employee_information_model.addBankInfo(result.chkBankInfo);
        addBankInfo.then((data)=>{
            return cb(null, {
                message: 'Successfully added Bank Info.'
            });
        }).catch((error) => {
            Logger.log('error', TAG + ACTION, error);
            return cb(Errors.raise('INTERNAL_SERVER_ERROR', error));
        });
    }else{
        return cb(null, result.chkBankInfo);
    }
};

//Check Legal Info is Existing
EmployeeInformationController.prototype.chkLegalInfo = function(result, cb){
    let ACTION = '[chkLegalInfo]';

    if (cb == undefined) result = cb;

    if(result.chkEmployeeNo.employee_no){
        let chkLegalInfo = employee_information_model.chkLegalInfo(result.chkEmployeeNo.employee_no);
        chkLegalInfo.then((data)=>{
            if(data.length > 0){
                return cb(Errors.raise('LEGAL_INFO_EMPLOYEE_NO_EXISTING'));
            }else {
                return cb(null, {
                    employee_no: this.req.body.employeeNo,
                    sss: this.req.body.sss,
                    hdmf: this.req.body.hdmf,
                    philhealth: this.req.body.philhealth,
                    tin: this.req.body.tin
                });
            }
        }).catch((error) => {
            Logger.log('error', TAG + ACTION, error);
            return cb(Errors.raise('INTERNAL_SERVER_ERROR', error));
        });
    }else{
        return cb(Errors.raise('NOT_FOUND_EMPLOYEE_NO'));
    }
};

// Add Legal Info
EmployeeInformationController.prototype.addLegalInfo = function(result, cb){
    let ACTION = '[addLegalInfo]';

    if (cb == undefined) result = cb;

    let data = {
        employee_no: this.req.body.employeeNo,
        sss: this.req.body.sss,
        hdmf: this.req.body.hdmf,
        philhealth: this.req.body.philhealth,
        tin: this.req.body.tin
    };

    if(result.chkEmployeeNo.employee_no){
        let addLegalInfo = employee_information_model.addLegalInfo(data);
    addLegalInfo.then((data)=>{
        return cb(null, {
            message: 'Successfully added Legal Info.'
        });
    }).catch((error) => {
        Logger.log('error', TAG + ACTION, error);
        return cb(Errors.raise('INTERNAL_SERVER_ERROR', error));
    });
    }else{
        return cb(null, result.chkLegalInfo);
    }
};

module.exports = EmployeeInformationController;