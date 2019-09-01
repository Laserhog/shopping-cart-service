const { expect } = require('chai');

const resourceMatcher = require('./resourceMatcher');

describe('resourceMatcher', () => {
  describe('isMatchEndpoint', () => {
    it('will return true for a matching resource/httpMethod', () => {
      const result = resourceMatcher.isMatchEndpoint(
        'GET',
        '/some-resource',
        {
          httpMethod: 'GET',
          resource: '/some-resource'
        }
      );

      expect(result).to.equal(true);
    });

    it('will return false for a non-matching resource', () => {
      const result = resourceMatcher.isMatchEndpoint(
        'GET',
        '/some-other-resource',
        {
          httpMethod: 'GET',
          resource: '/some-resource'
        }
      );

      expect(result).to.equal(false);
    });

    it('will return false for a non-matching httpMethod', () => {
      const result = resourceMatcher.isMatchEndpoint(
        'POST',
        '/some-resource',
        {
          httpMethod: 'GET',
          resource: '/some-resource'
        }
      );

      expect(result).to.equal(false);
    });

    it('will return false for a non-matching resource/httpMethod', () => {
      const result = resourceMatcher.isMatchEndpoint(
        'POST',
        '/some-other-resource',
        {
          httpMethod: 'GET',
          resource: '/some-resource'
        }
      );

      expect(result).to.equal(false);
    });
  });
});
