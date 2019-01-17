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
      INVALID_DARK_KNIGHT_CREDENTIALS: {
        status: 403,
        error: {
          code: -7,
          message: 'Participant ID or Account Key is incorrect.'
        }          
      },
      INVALID_DARK_KNIGHT_AMOUNT: {
        status: 403,
        error: {
          code: -8,
          message: 'Amount is invalid.'
        }          
      },
      DARK_KNIGHT_TRANSACTION_NOT_FOUND: {
        status: 404,
        error: {
          code: -9,
          message: 'Dark Knight Transaction not found.'
        }
      },
      DARK_KNIGHT_PARTICIPANT_NOT_FOUND: {
        status: 404,
        error: {
          code: -10,
          message: 'Dark Knight Participant not found.'
        }
      },
      DARK_KNIGHT_PARTICIPANT_MEMBER_NOT_FOUND: {
        status: 404,
        error: {
          code: -11,
          message: 'Dark Knight Participant Member not found.'
        }
      },
      DARK_KNIGHT_PERMISSION_NOT_FOUND: {
        status: 404,
        error: {
          code: -12,
          message: 'Dark Knight Permission not found.'
        }
      },
      PLAY_CONVERGENTID_TAKEN: {
        status: 404,
        error: {
            code: -13,
            message: 'ConvergentId already taken. Try to use another one.'
        }                
      },
      PLAY_CONVERGENTID_NOT_FOUND: {
        status: 404,
        error: {
            code: -14,
            message: 'ConvergentId not found.'
        }                
      },
    };
    return errors[tag];
  },
  raise: function (e) {
    var error = JSON.parse(JSON.stringify(this.get(e)));
    error.error.details = {source: 'test'};
    return error;
  }
};

