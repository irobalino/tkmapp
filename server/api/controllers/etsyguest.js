'use strict';

var config = require('config');
const axios = require('axios');

exports.generateGuestInfo = async function(req, res) {
    var generateGuestUrl = config.Etsy.BaseUrl + '/guests/generator?api_key=' + config.Etsy.App.key;

    await axios.get(generateGuestUrl)
        .then(response => {
            res.json(response.data);
        })
        .catch(function (error) {
            res.json(error.response)
        });
}

exports.addItemToGuestCart = async function(req, res) {
    var addListingToGuestCartUrl = config.Etsy.BaseUrl + '/guests/' + req.params.guestid + '/carts?api_key=' + config.Etsy.App.key + '&listing_id=' + req.body.listing_id + '&quantity=1';
    
    await axios.post(addListingToGuestCartUrl)
        .then(response => {
            res.json(response.data);
        })
        .catch(function (error) {
            res.json(error.response)
        });
}

exports.updateGuestCart = async function(req, res) {
    var updateGuestCartUrl = config.Etsy.BaseUrl + '/guests/' + req.params.guestid + '/carts/' + req.params.cartid + '?api_key=' + config.Etsy.App.key;
    
    await axios.put(updateGuestCartUrl, {
            "message_to_seller": req.body.message
        })
        .then(response => {
            res.json(response.data);
        })
        .catch(function (error) {
            res.json(error.response)
        });
}