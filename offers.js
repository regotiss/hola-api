const offers = {};

const saveOfferHandler = (req, res) => {
    const payload = req.body;
    const userId = req.params.userId;

    if (!userId) {
        return res.status(404).send({ error: 'user id missing' });
    }

    const userOffers = offers[userId];
    let id = 1;
    
    if (!userOffers) {
        offers[userId] = [{ ...payload, id }];
    } else {
        id = userOffers.length + 1;
        userOffers.push({ ...payload, id });
    }
    
    res.status(200).send({ 'offer_id': id });
};


const getOffersHandler = (req, res) => {
    const userId = req.params.userId;
    
    if (!userId) {
        return res.status(404).send({ error: 'user id missing' });
    }
    const userOffers = offers[userId];
    res.status(200).send({ 'offers': userOffers || [] });
};

module.exports = { saveOfferHandler, getOffersHandler, offers };
