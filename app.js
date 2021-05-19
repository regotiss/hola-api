const express = require('express');
const app = express();
const port = 3000;

const users = [];

app.use(express.json())

app.post('/signup', (req, res) => {
    const user = { ...req.body, id: users.length+1 };
    users.push(user);
    res.status(200).send({id: user.id});
});

app.listen(port, () => console.log(`App listening on port ${port}!`));