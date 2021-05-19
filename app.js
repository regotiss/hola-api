const express = require('express');
const app = express();
const port = 3000;

const MOBILE_NUMBER_REGEX = /^\d{10}$/;
const users = {};
let count = 1;

app.use(express.json())

app.post('/signup', (req, res) => {
    if (!MOBILE_NUMBER_REGEX.test(req.body.mobile_number)) {
        return res.status(404).send({error: 'mobile number is not valid'})
    }
    if(users[req.body.mobile_number]) {
        return res.status(404).send({error: 'user already registered'})
    }
    const user = { mobile_number: req.body.mobile_number, id: count };
    users[user.mobile_number] = user;
    count++;
    res.status(200).send({id: user.id});
});

app.post('/login', (req, res) => {
    const user = users[req.body.mobile_number];
    if(!user) {
        return res.status(404).send({error: 'user not exists'})
    }
    res.status(200).send(user);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));