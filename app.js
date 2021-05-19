const {signupHandler, loginHandler, userExistsHandler} = require('./user');
const { saveRequestHandler, getRequestsHandler, requests } = require('./requests');
const { saveOfferHandler, getOffersHandler, offers } = require('./offers');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json())

app.post('/signup', signupHandler);
app.post('/login', loginHandler);

app.post('/:userId/requests', [userExistsHandler, saveRequestHandler]);
app.get('/:userId/requests', [userExistsHandler, getRequestsHandler]);

app.post('/:userId/offers', [userExistsHandler, saveOfferHandler]);
app.get('/:userId/offers', [userExistsHandler, getOffersHandler]);

app.listen(port, () => console.log(`App listening on port ${port}!`));