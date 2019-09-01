const { expect } = require('chai');
const sinon = require('sinon');

const { BadGatewayError, NotFoundError, errorCodes } = require('../../exceptions');
const dynamoDB = require('../../gateways/dynamoDB');
const shoppingCartRepo = require('./shoppingCart.repo');
const ShoppingCart = require('./ShoppingCart.entity');

const sandbox = sinon.createSandbox();

describe('shoppingCart.repo', () => {
  afterEach(() => {
    sandbox.restore();
  });

  describe('putItem', () => {
    it('will call the dynamo db with the correct parameters', async () => {
      const shoppingCart = ShoppingCart.new();

      const putStub = sandbox.stub().returns({
        promise: () => Promise.resolve()
      });
      sandbox.stub(dynamoDB, 'getClient').returns({ put: putStub });

      await shoppingCartRepo.putCart(shoppingCart);

      expect(putStub.calledOnce).to.equal(true);
      expect(putStub.firstCall.args).to.deep.equal([{
        TableName: 'shopping-carts',
        Item: shoppingCart
      }]);
    });

    it('will throw a BadGatewayError if dynamo db throws an error', async () => {
      const shoppingCart = ShoppingCart.new();

      const errorToThrow = new Error('some error');
      const putStub = sandbox.stub().returns({
        promise: () => Promise.reject(errorToThrow)
      });
      sandbox.stub(dynamoDB, 'getClient').returns({ put: putStub });

      try {
        await shoppingCartRepo.putCart(shoppingCart);
        expect.fail('should fail');
      } catch (error) {
        expect(putStub.calledOnce).to.equal(true);
        expect(putStub.firstCall.args).to.deep.equal([{
          TableName: 'shopping-carts',
          Item: shoppingCart
        }]);

        expect(error).to.be.instanceOf(BadGatewayError);
        expect(error.message).to.equal(errorCodes.dynamoDBFailedToPut.message);
        expect(error.code).to.equal(errorCodes.dynamoDBFailedToPut.code);
        expect(error.moreInfo).to.deep.equal({
          params: {
            TableName: 'shopping-carts',
            Item: shoppingCart
          },
          innerError: 'some error'
        })
      }
    });
  });

  describe('getCartById', () => {
    it('will call the dynamo db with the correct parameters', async () => {
      const shoppingCart = ShoppingCart.new();
      const id = shoppingCart.id;

      const getStub = sandbox.stub().returns({
        promise: () => Promise.resolve({ Item: shoppingCart })
      });
      sandbox.stub(dynamoDB, 'getClient').returns({ get: getStub });

      const result = await shoppingCartRepo.getCartById(id);

      expect(getStub.calledOnce).to.equal(true);
      expect(getStub.firstCall.args).to.deep.equal([{
        TableName: 'shopping-carts',
        Key: { id }
      }]);

      expect(result).to.be.instanceOf(ShoppingCart);
      expect(result).to.deep.equal(shoppingCart);
    });

    it('will throw a NotFoundError if dyanmo db returns undefined', async () => {
      const id = 'someId';

      const getStub = sandbox.stub().returns({
        promise: () => Promise.resolve({ Item: undefined })
      });
      sandbox.stub(dynamoDB, 'getClient').returns({ get: getStub });

      try {
        await shoppingCartRepo.getCartById(id);
        expect.fail('should fail');
      } catch (error) {
        expect(getStub.calledOnce).to.equal(true);
        expect(getStub.firstCall.args).to.deep.equal([{
          TableName: 'shopping-carts',
          Key: { id }
        }]);

        expect(error).to.be.instanceOf(NotFoundError);
        expect(error.message).to.equal(errorCodes.dynamoDBItemNotFound.message);
        expect(error.code).to.equal(errorCodes.dynamoDBItemNotFound.code);
        expect(error.moreInfo).to.deep.equal({
          params: {
            TableName: 'shopping-carts',
            Key: { id }
          }
        });
      }
    });

    it('will throw a BadGatewayError if dynamo db throws an error', async () => {
      const id = 'someId';

      const errorToThrow = new Error('some error');
      const getStub = sandbox.stub().returns({
        promise: () => Promise.reject(errorToThrow)
      });
      sandbox.stub(dynamoDB, 'getClient').returns({ get: getStub });

      try {
        await shoppingCartRepo.getCartById(id);
        expect.fail('should fail');
      } catch (error) {
        expect(getStub.calledOnce).to.equal(true);
        expect(getStub.firstCall.args).to.deep.equal([{
          TableName: 'shopping-carts',
          Key: { id }
        }]);

        expect(error).to.be.instanceOf(BadGatewayError);
        expect(error.message).to.equal(errorCodes.dynamoDBFailedToGet.message);
        expect(error.code).to.equal(errorCodes.dynamoDBFailedToGet.code);
        expect(error.moreInfo).to.deep.equal({
          params: {
            TableName: 'shopping-carts',
            Key: { id }
          },
          innerError: 'some error'
        });
      }
    });
  });

  describe('deleteCartById', () => {
    it('will call the dynamo db with the correct parameters', async () => {
      const id = 'someId';

      const deleteStub = sandbox.stub().returns({
        promise: () => Promise.resolve()
      });
      sandbox.stub(dynamoDB, 'getClient').returns({ delete: deleteStub });

      await shoppingCartRepo.deleteCartById(id);

      expect(deleteStub.calledOnce).to.equal(true);
      expect(deleteStub.firstCall.args).to.deep.equal([{
        TableName: 'shopping-carts',
        Key: { id }
      }]);
    });

    it('will throw a BadGatewayError if dynamo db throws an error', async () => {
      const id = 'someId';

      const errorToThrow = new Error('some error');
      const deleteStub = sandbox.stub().returns({
        promise: () => Promise.reject(errorToThrow)
      });
      sandbox.stub(dynamoDB, 'getClient').returns({ delete: deleteStub });

      try {
        await shoppingCartRepo.deleteCartById(id);
        expect.fail('should fail');
      } catch (error) {
        expect(deleteStub.calledOnce).to.equal(true);
        expect(deleteStub.firstCall.args).to.deep.equal([{
          TableName: 'shopping-carts',
          Key: { id }
        }]);

        expect(error).to.be.instanceOf(BadGatewayError);
        expect(error.message).to.equal(errorCodes.dynamoDBFailedToDelete.message);
        expect(error.code).to.equal(errorCodes.dynamoDBFailedToDelete.code);
        expect(error.moreInfo).to.deep.equal({
          params: {
            TableName: 'shopping-carts',
            Key: { id }
          },
          innerError: 'some error'
        });
      }
    });
  });
});
