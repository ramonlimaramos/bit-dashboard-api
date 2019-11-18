import http from "http";
import express from "express";
import routes from "../routes";
import bodyParser from "body-parser";

/**
 * WebServer APP Class
 */

class App {
    constructor() {
        this.express = express();

        this.__middlewares();
        this.__routes();
    }

    __middlewares() {
        this.express.use(
            bodyParser.urlencoded({ limit: "50mb", extended: true })
        );
        this.express.use(bodyParser.json({ limit: "50mb" }));
        this.express.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            res.header(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept"
            );
            next();
        });
        this.express.disable("x-powered-by");
    }

    __routes() {
        this.express.use(routes);
    }

}

export default http.Server(new App().express);
