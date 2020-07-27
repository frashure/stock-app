const express = require('express');
const app = express();
const env = require('dotenv').config();
const bodyparser = require('body-parser');
const getRoute = require('./controllers/getController');
const recEngine = require('./controllers/recommendationController');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

let port = process.env.port || 3002;
app.listen(port, () => {
    console.log('Stock app listening on port ' + port);
});

app.get('/getQuote', getRoute.requestPrice);
app.get('/getEPS', getRoute.requestEPS);
app.get('/getPE', getRoute.requestPE);
app.get('/getPriceTarget', getRoute.requestPriceTarget);
app.get('/getRecommendation', recEngine.requestRec);
app.get('/getMultiRecs', recEngine.requestMultipleRecs);