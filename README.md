# typescript_catfact_demo

A simple typescript service that calls an external api to get a fact about cats, saves it for an hour and returns it through a GET endpoint.
## Setup

Install Node (tested with version 6.14.13)

In the root of the project run ``npm install``

### Run

Run with ``npm start``.

This will start a service with a GET endpoint at http://localhost:5000/long_cat_fact.

Scripts are saved in ``src`` folder.

### Test

Run tests with ``npm test``.

Tests are saved in ``tests\index.test.ts``.
