import moment from "moment-timezone";

export class IndexController {

    static async timezone(req, res) {

        let obj = {
            br_sp: moment.tz('America/Sao_Paulo').format("hh:mm"),
            br_date: moment().format("LLL"),
            us_ny: moment.tz('America/New_York').format("hh:mm"),
            us_date: moment().format("LLL")
        }

        res.json(obj);
    }
}