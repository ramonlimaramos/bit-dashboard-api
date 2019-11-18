
import { Mongo } from "config";
import mongoose from "mongoose";
import uriUtil from "mongodb-uri";
import mongoosePaginate from "mongoose-paginate";
import util from "util";
import mongooseMoment from "mongoose-moment";

const config = Mongo;
const uri = util.format(config.uri, encodeURIComponent(config.user), encodeURIComponent(config.pwd));

mongooseMoment(mongoose);
mongoose.connect(uriUtil.formatMongoose(uri), { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = () => {
    const db = {}

    db.connectionString = uri
    db.schema = mongoose
    db.connection = mongoose.connection
    db.port = config.port
    db.paginate = mongoosePaginate

    return db
}