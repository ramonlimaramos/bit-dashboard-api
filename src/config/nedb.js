import path from "path";
import Datastore from "nedb";

const datapath = process.env.DATAPATH || path.join(__dirname, "database")

const db = {
    btcDB: new Datastore({
        filename: `${datapath}/btc.db`,
        autoload: true
    }),
    brokerDB: new Datastore({
        filename: `${datapath}/broker.db`,
        autoload: true
    }),
};

module.exports = db;