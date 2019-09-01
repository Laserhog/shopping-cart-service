const R = require('ramda');

/**
 * Checks if the provided httpMethod and resource matches the lambda event
 *
 * @param {string} httpMethod
 * @param {string} resource
 * @param {object} event - lambda event
 * @param {string} event.resource
 * @param {string} event.httpMethod
 * @returns true if httpMethod and resource matches the provided event
 */
const isMatchEndpoint = (httpMethod, resource, event) => R.allPass([
  R.propEq('resource', resource),
  R.propEq('httpMethod', httpMethod)
])(event);

module.exports = {
  isMatchEndpoint: R.curry(isMatchEndpoint)
};
