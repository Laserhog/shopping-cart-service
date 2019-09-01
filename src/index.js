const handlers = require('./handlers');

const handler = async (event) => {
  try {
    const foundHandler = handlers.findHandler(event);
    return await foundHandler(event);
  } catch (error) {
    throw error;
  }
};

exports.handler = handler;
