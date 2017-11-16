const errors = {
  ERR_UNKNOWN: {
    statusCode: 500,
    message: 'An unknown error occurred.'
  },
  ERR_USER_EXISTS: {
    statusCode: 403,
    message: 'A user with this email address already exists.'
  },
  ERR_VALIDATION: {
    statusCode: 400,
    message: 'One of the supplied parameters could not be validated. Please ensure all expected parameters are supplied and well-formed.'
  }
};

module.exports = errors;
