module.exports = {
    get: function (tag) {
      var errors = {
        MISSING_INVALID_PARAMS: { 
          status: 400, 
          error: { 
            code: -1, 
            message: 'Missing/invalid parameters.', 
            params: [] 
          } 
        },
        INTERNAL_SERVER_ERROR: {
          status: 500, 
          error: {
            code: -2, 
            message: 'Internal server error.'
          }
        },
        NOT_FOUND: {
          status: 404, 
          error: { 
            code: -3, 
            message: "Not found."
          }
        },
        SERVER_ERROR: {
          status: 500,
          error: {
            code: -4,
            message: 'Server unreachable.'
          }
        },
        SERVICE_ERROR: {
          status: 500,
          error: {
            code: -5,
            message: 'Service error/unavailable.'
          }
        },
        UNAUTHORIZED_ACCESS: {
          status: 401,
          error: {
            code: -6,
            message: 'Unauthorized Access.'
          }
        },
        MISSING_FIRST_NAME: { 
          status: 400, 
          error: { 
            code: -7, 
            message: 'First Name is required.'
          } 
        },
        EMPLOYEE_NO_TAKEN: { 
          status: 400, 
          error: { 
            code: -8, 
            message: 'Employee Number already taken.'
          } 
        },
        MISSING_EMPLOYEE_NO: { 
          status: 400, 
          error: { 
            code: -9, 
            message: 'Missing Employee No.'
          } 
        },
        INVALID_START_DATE: { 
          status: 400, 
          error: { 
            code: -10, 
            message: 'Start Date format is invalid.'
          } 
        },
        INVALID_REG_DATE: { 
          status: 400, 
          error: { 
            code: -11, 
            message: 'Regularization Date format is invalid.'
          } 
        },
        INVALID_END_DATE: { 
          status: 400, 
          error: { 
            code: -12, 
            message: 'End Date format is invalid.'
          } 
        },
        INVALID_START_YEAR: { 
          status: 400, 
          error: { 
            code: -13, 
            message: 'Start Year format is invalid.'
          } 
        },
        INVALID_END_YEAR: { 
          status: 400, 
          error: { 
            code: -14, 
            message: 'End Year format is invalid.'
          } 
        },
        INVALID_DATE_FROM: { 
          status: 400, 
          error: { 
            code: -15, 
            message: 'Date From format is invalid.'
          } 
        },
        INVALID_DATE_TO: { 
          status: 400, 
          error: { 
            code: -16, 
            message: 'Date To format is invalid.'
          } 
        },
        NOT_FOUND_EMPLOYEE_NO: { 
          status: 404, 
          error: { 
            code: -17, 
            message: 'Employee not found.'
          } 
        },
        BANK_INFO_EMPLOYEE_NO_EXISTING: { 
          status: 400, 
          error: { 
            code: -18, 
            message: 'Employee already had bank info.'
          } 
        },
        LEGAL_INFO_EMPLOYEE_NO_EXISTING: { 
          status: 400, 
          error: { 
            code: -19, 
            message: 'Employee already had legal info.'
          } 
        }
      };
      return errors[tag];
    },
    raise: function (e) {
      var error = JSON.parse(JSON.stringify(this.get(e)));
      return error;
    }
  };