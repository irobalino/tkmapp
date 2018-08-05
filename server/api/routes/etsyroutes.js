'use strict';

module.exports = function(app) {
    var etsyListings = require('../controllers/etsylistings');
    var etsyGuest = require('../controllers/etsyguest');

    app.route('/api/listings')
        .get(etsyListings.getShopListings);

    app.route('/api/listings/:listingid/inventory')
        .get(etsyListings.getListingInventory);        

    app.route('/api/guest')
        .get(etsyGuest.generateGuestInfo);        

    app.route('/api/guest/:guestid/carts/listing/:listingid')
        .post(etsyGuest.addItemToGuestCart);         

    app.route('/api/guest/:guestid/carts/:cartid')
        .put(etsyGuest.updateGuestCart);                
}
