import Socket from "../config/socketio";
import * as Schedule from "node-schedule";
import moment from "moment";
import moneyCurrency from "currency.js";

import {
    BTCBrazil,
    BTCUsa,
    BTCColombia,
    BTCArgentina,
    Brokerages,
    BTCEuro
} from "./workers";

import {
    BtcModel,
    BrokerModel
} from "../app";

import {
    ConvertToRealBtc,
    stringToCurr
} from "../config";


const getDate = () => moment().format('YYYY-MM-DD');
const nowTime = () => moment().format('YYYY-MM-DD HH:mm:ss');
const socket = new Socket().getInstance();
const btcDB = new BtcModel();
const brokerDB = new BrokerModel();

const schedulers = {

    everyOneMinute: () => {
        let rule = new Schedule.RecurrenceRule();
        rule.minute = new Schedule.Range(0, 59, 1);
        return rule;
    },

    everyOneMinuteThirdSec: () => {
        let rule = new Schedule.RecurrenceRule();
        rule.second = 20;
        return rule;
    },

    handleErr: err => err ? console.log(err) : true,

    handleBTC: (currency, nameObj) => {

        let date = getDate();

        btcDB.findOne({
            date,
            curr: nameObj
        }, (err, doc) => {
            let obj = {};

            ConvertToRealBtc.call(currency.value, nameObj)
                .then(convertion => {

                    if (doc && !err) {
                        obj[nameObj] = Object.assign(currency, convertion);
                        btcDB.updateOne({
                            date,
                            curr: nameObj
                        }, {
                            $push: obj
                        }, err => err ? console.log(err) : true);

                    } else {
                        obj[nameObj] = [Object.assign(currency, convertion)];
                        obj["curr"] = nameObj;
                        obj["date"] = date;

                        let result = new btcDB(obj);
                        result.save(obj, err => err ? console.log(err) : true);
                    }
                });
        });
    },

    btcBrasil: async () => {

        // Schedule.scheduleJob(schedulers.everyOneMinute(), async () => {

            console.log("running btc br");

            let btc = await new BTCBrazil().execute();
            let br = {
                value: btc.br,
                time: nowTime()
            };
            let brMarket = {
                value: moneyCurrency((stringToCurr(btc.br) * 1.012), {
                    decimal: ',',
                    separator: '.',
                }).format(),
                time: nowTime()
            }

            schedulers.handleBTC(br, "br");
            schedulers.handleBTC(brMarket, "brMarket");

            console.log("completed btc br");
        // });
    },

    btcColombia: async () => {

        // Schedule.scheduleJob(schedulers.everyOneMinute(), async () => {

            console.log("running btc col");

            let btc = await new BTCColombia().execute();
            let col = {
                value: btc.col,
                time: nowTime()
            };

            schedulers.handleBTC(col, "col");

            console.log("completed btc col");
        // });
    },

    btcArgentina: async () => {

        // Schedule.scheduleJob(schedulers.everyOneMinute(), async () => {

            console.log("running btc arg");

            let btc = await new BTCArgentina().execute();
            let arg = {
                value: btc.arg,
                time: nowTime()
            };

            schedulers.handleBTC(arg, "arg");

            console.log("completed btc arg");
        // });
    },

    btcUsa: async () => {

        // Schedule.scheduleJob(schedulers.everyOneMinute(), async () => {

            console.log("running btc us");

            let btc = await new BTCUsa().execute();
            let us = {
                value: btc.us,
                time: nowTime()
            };
            let usMarket = {
                value: moneyCurrency((stringToCurr(btc.us) * 1.012), {
                    decimal: ',',
                    separator: '.',
                }).format(),
                time: nowTime()
            }

            schedulers.handleBTC(us, "us");
            schedulers.handleBTC(usMarket, "usMarket");

            console.log("completed btc us");
        // });
    },

    btcEur: async () => {

        // Schedule.scheduleJob(schedulers.everyOneMinute(), async () => {

            console.log("running btc eur");

            let btc = await new BTCEuro().execute();
            let eur = {
                value: btc.eur,
                time: nowTime()
            };

            schedulers.handleBTC(eur, "eur");

            console.log("completed btc us");
        // });
    },

    brokerages: async () => {

        // Schedule.scheduleJob(schedulers.everyOneMinute(), async () => {

            console.log("running borkerages");
            let date = getDate();
            let brokerages = await new Brokerages().execute();
            let obj = {
                date: date,
                brokers: [...brokerages]
            }

            // brokerDB.loadDatabase();
            brokerDB.deleteMany({}, err => err ? console.log(err) : true);
            
            let result = new brokerDB(obj);
            result.save(obj, err => err ? console.log(err) : true);

            console.log("completed borkerages");
        // });
    },


    runWorkers: () => {

        Schedule.scheduleJob(schedulers.everyOneMinute(), async () => {
            console.log("running workers", nowTime());

            await Promise.all([
                await schedulers.btcBrasil(),
                await schedulers.btcColombia(),
                await schedulers.btcArgentina(),
                await schedulers.btcUsa(),
                await schedulers.btcEur(),
                await schedulers.brokerages()
            ]);

            console.log("running complete", nowTime());
            schedulers.emit();
        });
    },

    emit: async () => {

        // Schedule.scheduleJob(schedulers.everyOneMinuteThirdSec(), () => {

            console.log("emiting sockets");
            try {
                
                let date = getDate();
                let doc = await btcDB.find().lean().exec();
                let result = {
                    btc: {}
                };
    
                doc.map(item => {
                    result.btc[item.curr] = item[item.curr].reverse()[0];
                });
                
                let docBroker = await brokerDB.find({ date }).lean().exec();
                result.brokerages = docBroker;
    
                socket.io.emit("dashboard", result);

            } catch (error) {
                res.status(403).json({
                    Error: error
                });
            }
            console.log("emiting sockets success");

        // });
    },

    start: () => {

        // schedulers.btcBrasil();
        // schedulers.btcColombia();
        // schedulers.btcArgentina();
        // schedulers.btcUsa();
        // schedulers.btcEur();
        // schedulers.brokerages();
        // schedulers.emit();
        schedulers.runWorkers();
    }
}


schedulers.start();