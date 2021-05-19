const offers = {};

const saveOfferHandler = (req, res) => {
    const payload = req.body;
    const userId = Number(req.params.userId);
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
    const userId = Number(req.params.userId);
    const userOffers = offers[userId];
    res.status(200).send({ 'offers': userOffers || [] });
};

module.exports = { saveOfferHandler, getOffersHandler, offers };
