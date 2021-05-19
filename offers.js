const {getMatchingRequests} = require('./requests');

const offers = {};

const saveOfferHandler = (req, res) => {
    const payload = req.body;
    const userId = req.params.userId;
    const userOffers = offers[userId];
    let id = 1;
    
    if (!userOffers) {
        offers[userId] = [{ ...payload, id, user_id: userId }];
    } else {
        id = userOffers.length + 1;
        userOffers.push({ ...payload, id, user_id: userId  });
    }
    
    res.status(200).send({ 'offer_id': id });
};


const getOffersHandler = (req, res) => {
    const userId = req.params.userId;
    const userOffers = offers[userId];
    res.status(200).send({ 'offers': userOffers || [] });
};

const getMatchingRequestsHandler = (req, res) => {
    const userId = req.params.userId;
    const offerId = req.params.offerId;
    const userOffer = offers[userId][offerId-1];
    res.status(200).send(getMatchingRequests(userOffer.tags));
};

module.exports = { saveOfferHandler, getOffersHandler, getMatchingRequestsHandler };
