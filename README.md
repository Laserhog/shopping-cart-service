# shopping-cart-service

## How to run
This service is deployed to AWS Lambda. In order to use it, the endpoints can be called as per the [swagger](docs/swagger.yml). An `x-api-key` is required in the headers, and is provided as per the email. I will also provide a Postman collection link with the email, which contains all 5 endpoints, and the `x-api-key` already configured.

## Unit, Integration and Component Tests
* Test suite can be run via the `npm run test` script, however the Integration test will not work on your local environment (due to requiring AWS credentials).
* Would recommend to just use individual test scripts `npm run test:unit:` and `npm run test:component`

## Note on authorization
I'm using `x-api-key` for simplicity. In a real scenario I would rather build an authorizer to check a signed JSON Web Token, and control access.