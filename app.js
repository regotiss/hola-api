const express = require('express');
const app = express();
const port = 3000;

const MOBILE_NUMBER_REGEX = /^\d{10}$/;
const users = {};
const requests = {};
const offers = {};
let count = 1;

app.use(express.json())

app.post('/signup', (req, res) => {
    if (!MOBILE_NUMBER_REGEX.test(req.body.mobile_number)) {
        return res.status(404).send({ error: 'mobile number is not valid' })
    }
    if (users[req.body.mobile_number]) {
        return res.status(404).send({ error: 'user already registered' })
    }
    const user = { mobile_number: req.body.mobile_number, id: count };
    users[user.mobile_number] = user;
    count++;
    res.status(200).send({ id: user.id });
});

app.post('/login', (req, res) => {
    const user = users[req.body.mobile_number];
    if (!user) {
        return res.status(404).send({ error: 'user not exists' });
    }
    res.status(200).send(user);
});

app.post('/user/requests', (req, res) => {
    const payload = req.body;
    if (!payload.user_id) {
        return res.status(404).send({ error: 'user id missing' });
    }
    const userRequests = requests[payload.user_id];
    res.status(200).send({ 'requests': userRequests || [] });
});

app.post('/requests', (req, res) => {
    const payload = req.body;
    if (!payload.user_id) {
        return res.status(404).send({ error: 'user id missing' });
    }
    const userRequests = requests[payload.user_id];
    let id = 1;
    if (!userRequests) {
        requests[payload.user_id] = [{ ...payload, id }];
    } else {
        id = userRequests.length + 1;
        userRequests.push({ ...payload, id });
    }
    res.status(200).send({ 'request_id': id });
});

app.post('/offers', (req, res) => {
    const payload = req.body;
    if (!payload.user_id) {
        return res.status(404).send({ error: 'user id missing' });
    }
    const userOffers = offers[payload.user_id];
    if (!userOffers) {
        offers[payload.user_id] = [{ ...payload, id }];
    } else {
        id = userOffers.length + 1;
        userOffers.push({ ...payload, id });
    }
    res.status(200).send({ 'offer_id': id });
});

app.post('user/offers', (req, res) => {
    const payload = req.body;
    if (!payload.user_id) {
        return res.status(404).send({ error: 'user id missing' });
    }
    const userOffers = offers[payload.user_id];
    res.status(200).send({ 'offers': userOffers || [] });
});


app.listen(port, () => console.log(`App listening on port ${port}!`));