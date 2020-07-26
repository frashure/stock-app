const fetch = require('node-fetch');


var controller = {

    getPrice: async (req, res, next) => {
        let url = 'https://finnhub.io/api/v1/quote?symbol=' + req.body.symbol;
        console.log(req.body);
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Finnhub-Token': process.env.token
            }
        }
        // let response = await fetch(url, options);
        // let jsonRes = await response.json();
        // console.log(response);
        fetch (url, options)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((e) => {
                console.log(e.message);
            });
        // console.log(jsonRes);
        res.sendStatus(200);
    }


}

module.exports = controller;