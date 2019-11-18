import app from "./config/express";
import Socket from "./config/socketio";
import MongoDB from "./config/mongodb";

const server = new Socket(app).getInstance();
const mongo = MongoDB();

server.io.on("connection", socket => {
    console.log(
        `Socket host-client ${socket.request.socket.remoteAddress} connected'`
    );
});

server.httpServer.listen(process.env.PORT || 4000, () => {
    console.log(`Bit Dashboard working on ${process.env.PORT || 4000}`);

    mongo.connection.once('open', () => {
        console.log('Bit-Dashboard Mongo DB running on port', mongo.port)
    });

    mongo.connection.on('error', (err) => {
        console.log('Bit-Dashboard Mongo DB connection error', err)
    });
});