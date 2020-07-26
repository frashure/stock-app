const express = require('express');
const app = express();
const env = require('dotenv').config();
const bodyparser = require('body-parser');
const getRoute = require('./controllers/getController');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

let port = process.env.port || 3002;
app.listen(port, () => {
    console.log('Stock app listening on port ' + port);
});

app.get('/getQuote', getRoute.getPrice);

