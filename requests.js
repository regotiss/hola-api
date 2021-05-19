const { getMatchingOffers } = require('./offers');
const { getMatchingedValues } = require('./utils');

const requests = {};
const saveRequestHandler = (req, res) => {
    const payload = req.body;
    const userId = Number(req.params.userId);
    const userRequests = requests[userId];
    let id = 1;

    if (!userRequests) {
        requests[userId] = [{ ...payload, id, user_id: userId }];
    } else {
        id = userRequests.length + 1;
        userRequests.push({ ...payload, id, user_id: userId });
    }

    res.status(200).send({ 'request_id': id });
};

const getRequestsHandler = (req, res) => {
    const userId = Number(req.params.userId);
    const userRequests = requests[userId];
    res.status(200).send({ 'requests': userRequests || [] });
};

const getMatchingRequests = (tags) => {
    return getMatchingedValues(requests, tags);
}

module.exports = { saveRequestHandler, getRequestsHandler, getMatchingRequests, requests };


