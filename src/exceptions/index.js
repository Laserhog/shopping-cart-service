const errorCodes = require('./errorCodes');
const NotFoundError = require('./NotFoundException');
const InternalServerError = require('./InternalServerError');
const BadGatewayError = require('./BadGatewayError');

module.exports = {
  errorCodes,
  NotFoundError,
  InternalServerError,
  BadGatewayError
};
