'use strict';

module.exports = function(app) {
    var testController = require('../controllers/testcontroller');

    app.route('/api/hello')
        .get(testController.sayhello);
}
