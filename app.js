const {signupHandler, loginHandler, userExistsHandler} = require('./user');
const { saveRequestHandler, getRequestsHandler, requests } = require('./requests');
const { saveOfferHandler, getOffersHandler, offers } = require('./offers');
const { getMatchingValuesHandler } = require('./utils');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json())

app.post('/signup', signupHandler);
app.post('/login', loginHandler);

app.post('/users/:userId/requests', [userExistsHandler, saveRequestHandler]);
app.get('/users/:userId/requests', [userExistsHandler, getRequestsHandler]);
app.get('/users/:userId/requests/:id/offers', [userExistsHandler, getMatchingValuesHandler(requests, offers)]);

app.post('/users/:userId/offers', [userExistsHandler, saveOfferHandler]);
app.get('/users/:userId/offers', [userExistsHandler, getOffersHandler]);
app.get('/users/:userId/offers/:id/requests', [userExistsHandler, getMatchingValuesHandler(offers, requests)]);

app.listen(port, () => console.log(`App listening on port ${port}!`));