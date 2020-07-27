const getter = require('./getController');

var controller = {

    consensusRec: async (symbol) => {
        let grade = 0;
        let recs = await getter.getPriceTarget(symbol);
        let price = await getter.getPrice(symbol);

        let high = recs.targetHigh;
        let mean = recs.targetMean;
        let highDiffPerc = (high - price.c) / high;
        let meanDiffPerc = (mean - price.c) / mean;

        if (price > high) {
            grade = 0;
        }
        else if (price > mean) {
            grade = 1;
        }
        else if (highDiffPerc > .0 && highDiffPerc < .2) {
            grade = 2;
        }
        else if (highDiffPerc >= .2 && highDiffPerc < .3) {
            grade = 3;
        }
        else if (highDiffPerc >= .3 && highDiffPerc < .4) {
            grade = 4;
        }
        else if (highDiffPerc >= .4) {
            grade = 5;
        }

        return grade;
    },

    requestRec: async (req, res, next) => {
        let rec = await controller.consensusRec(req.body.symbol);
        res.status(200).json(rec);
    },

    requestMultipleRecs: async (req, res, next) => {
        let recs = [];
        console.log(req.body);
        for (i = 0; i < req.body.length; i++) {
            let grade = await controller.consensusRec(req.body[i]);
            let rec = {
                "symbol": req.body[i],
                "grade": grade
            }
            recs.push(rec);
        }
        res.status(200).json(recs);
    }

}

module.exports = controller;