import { Routes } from "./config";
import {
    IndexController,
    BTCController,
    ConvertionController
} from "./app";

/**
 * Where bit-dashboard API endpoints are defined
 */

const routes = new Routes();

routes
    .route("/timezone")
    .get(IndexController.timezone);
routes
    .route("/btc/history/:date")
    .get(BTCController.btc);
routes
    .route("/btc/:curr/:date")
    .get(BTCController.singlebtc);
routes
    .route("/brokerages/:date")
    .get(BTCController.brokerages);
routes
    .route("/converter")
    .get(ConvertionController.alltoreal);
routes
    .route("/converter/arg/to/real")
    .get(ConvertionController.argtoreal);
routes
    .route("/converter/us/to/real")
    .get(ConvertionController.ustoreal);
routes
    .route("/converter/col/to/real")
    .get(ConvertionController.coltoreal);
routes
    .route("/converter/eur/to/real")
    .get(ConvertionController.eurtoreal);

export default routes;