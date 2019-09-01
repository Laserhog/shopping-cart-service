const errorCodes = {
  noHandlerMapping: { code: 1, message: 'No handler mapping' },
  dynamoDBFailedToPut: { code: 2, message: 'Failed to put item into DynamoDB' },
  dynamoDBFailedToGet: { code: 3, message: 'Failed to get item from DynamoDB' },
  dynamoDBFailedToDelete: { code: 4, message: 'Failed to delete item from DynamoDB' },
  dynamoDBItemNotFound: { code: 5, message: 'No item found for specified id' },
  unknownProduct: { code: 6, message: 'Product not found' }
};

module.exports = errorCodes;