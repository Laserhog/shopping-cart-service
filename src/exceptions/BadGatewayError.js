class BadGatewayError {
  /**
   * Builds a BadGatewayError
   * 
   * @param {object} codeAndMessage
   * @param {number} codeAndMessage.code
   * @param {string} codeAndMessage.message
   * @param {*} moreInfo  
   */
  constructor (codeAndMessage, moreInfo) {
    this.code = codeAndMessage.code;
    this.message = codeAndMessage.message;
    this.moreInfo = moreInfo;
    this.statusCode = 502;
  };
};

module.exports = BadGatewayError;