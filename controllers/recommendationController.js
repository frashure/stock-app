const getter = require('./getController');

var controller = {

    consensusRec: (symbol) => {
        let grade = 0;
        let recs = getter.getPriceTarget(symbol);
        let price = getter.getPrice(symbol);

        let high = rec.targetHigh;
        let mean = rec.targetMean;
        let highDiffPerc = (high - price.c) / high;
        let meanDiffPerc = (mean - price.c) / mean;

        if (price > high) {
            grade = 0;
        }
        else if (price > mean) {
            grade = 1;
        }
        // TODO: Implement grading based on percentage difference from mean and high targets

    }

}

module.exports = controller;