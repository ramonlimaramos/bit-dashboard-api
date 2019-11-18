import MongoDB from "../../config/mongodb";

const mongo = MongoDB();
const btcSchema = new mongo.schema.Schema(Object, { strict: false });
const btcDB = mongo.schema.model("btc", btcSchema);

export class BtcModel {

    constructor() {

        return btcDB;
    }
}