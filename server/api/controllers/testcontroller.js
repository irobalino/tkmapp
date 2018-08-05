'use strict';

exports.sayhello = async function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' }); 
}