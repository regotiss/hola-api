const { getUser } = require('./user');

const requests = {};
const saveRequestHandler = (req, res) => {
    const payload = req.body;
    const userId = req.params.userId;
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
    const userId = req.params.userId;
    const userRequests = requests[userId];
    res.status(200).send({ 'requests': userRequests || [] });
};

const getMatchingRequests = (tags) => {
    let matchingRequests = [];
    Object.keys(requests).forEach(key => {
        userRequests = requests[key];
        const filteredRequests = getFilteredRequests(userRequests, tags);
        matchingRequests = matchingRequests.concat(filteredRequests);
    });
    return matchingRequests;
}

const getFilteredRequests = (userRequests, tags) => {
    console.log({getUser});
    return userRequests.filter(req => isRequestTagsMatching(req, tags)).map(req => ({
        request: req,
        user: getUser(req.user_id),
    }));
}

const isRequestTagsMatching = (request, tags) => {
    const filteredTags = request.tags.some(tag => {
        return tags.includes(tag);
    });
    return filteredTags;
}

module.exports = { saveRequestHandler, getRequestsHandler, getMatchingRequests };


