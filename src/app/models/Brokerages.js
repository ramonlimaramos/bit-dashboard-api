import MongoDB from "../../config/mongodb";

const mongo = MongoDB();
const brokeragesSchema = new mongo.schema.Schema(Object, { strict: false });
const brokeragesDB = mongo.schema.model("brokerages", brokeragesSchema);

export class BrokerModel {

    constructor() {
        return brokeragesDB;
    }
}