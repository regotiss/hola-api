const { getUserById } = require('./user');

const getMatchingedValues = (values, tags) => {
    let matchingValues = [];
    Object.keys(values).forEach(key => {
        const valuesWithTags = values[key];
        const filteredValues = getFilteredRequests(valuesWithTags, tags);
        matchingValues = matchingValues.concat(filteredValues);
    });
    return matchingValues;
}

const getFilteredRequests = (valuesWithTags, tags) => {
    return valuesWithTags.filter(req => anyTagMatching(req, tags)).map(req => ({
        match: req,
        user: getUserById(req.user_id),
    }));
}

const anyTagMatching = (value, tags) => {
    const filteredTags = value.tags.some(tag => {
        return tags.includes(tag);
    });
    return filteredTags;
}

const getMatchingValuesHandler = (values, oppositeValues) => (req, res) => {
    const userId = Number(req.params.userId);
    const id = req.params.id;
    console.log({values, oppositeValues, id, userId});
    const value = values[userId][id-1];
    res.status(200).send(getMatchingedValues(oppositeValues, value.tags));
};
module.exports = { getMatchingValuesHandler, getMatchingedValues };