const fetch = require('node-fetch');


var controller = {

    getProfile: async (symbol) => {
        let url = 'https://finnhub.io/api/v1/stock/profile2?symbol=' + symbol;
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Finnhub-Token': process.env.token
            }
        }
        const response = await fetch(url, options)
            .catch((e) => {
                console.log(e.message);
            });
        return response.json();
    },

    getPrice: async (symbol) => {
        let url = 'https://finnhub.io/api/v1/quote?symbol=' + symbol;
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Finnhub-Token': process.env.token
            }
        }
        const response = await fetch(url, options)
            .catch((e) => {
                console.log(e.message);
            });
        return response.json();
    },

    requestPrice: async (req, res, next) => {
        let price = await controller.getPrice(req.body.symbol);
        res.status(200).send(price);
    },

    getEPS: async (symbol) => {
        let url = 'https://finnhub.io/api/v1/stock/earnings?symbol=' + symbol;
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Finnhub-Token': process.env.token
            }
        }
        const response = await fetch(url, options)
            .catch((e) => {
                console.log(e.message);
            });
        return response.json();
    },

    requestEPS: async (req, res, next) => {
        let epsBody = await controller.getEPS(req.body.symbol);
        res.status(200).send(epsBody);
    },

    getPE: async (symbol) => {
        let epsBody = await controller.getEPS(symbol);
        let eps = 0;

        for (let i = 0; i < epsBody.length; i++) {
            eps += epsBody[i].actual;
        }

        let priceBody = await controller.getPrice(symbol);
        let price = priceBody.c;
        let per = price / eps;
        return per;
    },

    requestPE: async (req, res, next) => {
        let per = await controller.getPE(req.body.symbol);
        res.status(200).json(per);
    },

    getPriceTarget: async (symbol) => {
        let url = 'https://finnhub.io/api/v1//stock/price-target?symbol=' + symbol;
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Finnhub-Token': process.env.token
            }
        }
        const response = await fetch(url, options)
            .catch((e) => {
                console.log(e.message);
            });
        return response.json();
    },

    requestPriceTarget: async (res, req, next) => {
        let priceTarget = await controller.getPriceTarget(symbol);
        res.status(200).json(priceTarget);
    }

}

module.exports = controller;