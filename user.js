let count = 1;
const MOBILE_NUMBER_REGEX = /^\d{10}$/;
const users = [];

const signupHandler = (req, res) => {
    const mobileNumber = req.body.mobile_number;

    if (!MOBILE_NUMBER_REGEX.test(mobileNumber)) {
        return res.status(404).send({ error: 'mobile number is not valid' })
    }

    if (isUserExists(mobileNumber)) {
        return res.status(404).send({ error: 'user already registered' })
    }

    const user = { ...req.body, id: count };
    users.push(user);
    count++;

    res.status(200).send({ id: user.id });
}

const loginHandler = (req, res) => {
    const user = getUser(req.body.mobile_number);
    if (!user) {
        return res.status(404).send({ error: 'user not exists' });
    }
    res.status(200).send(user);
}

const isUserExists = (mobile_number) => {
    return users.some(user => user.mobile_number === mobile_number);
}

const getUser = (mobile_number) => {
    return users.find(user => user.mobile_number === mobile_number);
}
module.exports = { signupHandler, loginHandler, users };