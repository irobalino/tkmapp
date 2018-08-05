'use strict';

var config = require('config');
const axios = require('axios');

exports.getShopListings = async function(req, res) {
    var listings_url = config.Etsy.BaseUrl + '/shops/' + config.Etsy.Shop.id + '/listings/active?api_key=' + config.Etsy.App.key + '&includes=MainImage';

    await axios.get(listings_url)
        .then(response => {
            res.json(response.data);
        })
        .catch(function (error) {
            res.json(error.response)
        });
}

exports.getListingInventory = async function(req, res) {
    var inventory_url = config.Etsy.BaseUrl + '/listings/' + req.params.listingid + '/inventory?api_key=' + config.Etsy.App.key;

    await axios.get(inventory_url)
        .then(response => {
            res.json(response.data);
        })
        .catch(function (error) {
            res.json(error.response)
        });
}
