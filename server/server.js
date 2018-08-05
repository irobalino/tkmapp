// our dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = process.env.PORT || 5000;

var etsyroutes = require('./api/routes/etsyroutes')
var testroutes = require('./api/routes/testroutes')

etsyroutes(app);
testroutes(app);


// Serve any static files
app.use(express.static(path.join(__dirname, '../client/build')));

// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});


app.listen(port, () => { 
    console.log(`Listening on port ${port}`) 
});
