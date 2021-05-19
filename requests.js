const requests = {};
const saveRequestHandler = (req, res) => {
    const payload = req.body;
    const userId = req.params.userId;

    if (!userId) {
        return res.status(404).send({ error: 'user id missing' });
    }

    const userRequests = requests[userId];
    let id = 1;
    
    if (!userRequests) {
        requests[userId] = [{ ...payload, id }];
    } else {
        id = userRequests.length + 1;
        userRequests.push({ ...payload, id });
    }
    
    res.status(200).send({ 'request_id': id });
};


const getRequestsHandler = (req, res) => {
    const userId = req.params.userId;
    
    if (!userId) {
        return res.status(404).send({ error: 'user id missing' });
    }
    const userRequests = requests[userId];
    res.status(200).send({ 'requests': userRequests || [] });
};

module.exports = { saveRequestHandler, getRequestsHandler, requests };
