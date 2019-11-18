import moment from "moment";
import {
    BtcModel
} from "../models/BTC";
import {
    BrokerModel
} from "../models/Brokerages";


/**
 * Class responsible for handle
 * Bitcoins selections
 */

const btcDB = new BtcModel();
const brokerDB = new BrokerModel();

export class BTCController {
    
    static async btc(req, res, next) {
        
        try {

            let date = req.params.date || moment().format('YYYY-MM-DD');
            let doc = await btcDB.find({ date }).lean().exec();
            let result = {};

            doc.map(item => {
                result[item.curr] = item[item.curr]
            })
            res.json(result);

        } catch (error) {
            res.status(403).json({
                Error: error
            });
        }

    }


    static async singlebtc(req, res, next) {

        try {
            let { curr, date } = req.params;

            if(!curr && !date)
                return res.status(403).json({ error: 'currency and date is mandatory' });

            let doc = await btcDB.find({ date, curr }).lean().exec();
            let btcValue = {};

            if (doc.length > 0)
                btcValue = doc[0][curr].reverse()[0];

            res.json(btcValue);

        } catch (error) {
            res.status(403).json({
                Error: error
            });
        }
    }


    static async brokerages(req, res, next) {

        try {
            let date = req.params.date || moment().format('YYYY-MM-DD');
            let doc = await brokerDB.find({ date }).lean().exec();

            res.json(doc);

        } catch (error) {
            res.status(403).json({
                Error: error
            });
        }
    }
}