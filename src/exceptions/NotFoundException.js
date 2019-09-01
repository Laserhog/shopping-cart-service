class NotFoundException {
  /**
   * Builds a NotFoundException
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
    this.statusCode = 404;
  };
};

module.exports = NotFoundException;