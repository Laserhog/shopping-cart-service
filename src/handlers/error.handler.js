
const { errorCodes, InternalServerError } = require('../exceptions');

const errorHandler = () => {
  throw new InternalServerError(errorCodes.noHandlerMapping);
};

module.exports = errorHandler;
