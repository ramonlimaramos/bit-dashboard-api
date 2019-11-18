import {
    ArgToReal,
    UsToReal,
    ColToReal,
    EurToReal
} from '../../job/workers';

export class ConvertionController {

    static async argtoreal(req, res) {

        let result = await new ArgToReal().execute();

        res.json(result);
    }

    static async ustoreal(req, res) {

        let result = await new UsToReal().execute();

        res.json(result);
    }

    static async coltoreal(req, res) {

        let result = await new ColToReal().execute();

        res.json(result);
    }

    static async eurtoreal(req, res) {

        let result = await new EurToReal().execute();

        res.json(result);
    }

    static async alltoreal(req, res) {

        let result = {};
        let obj = await Promise.all([
            new ArgToReal().execute(),
            new UsToReal().execute(),
            new ColToReal().execute(),
            new EurToReal().execute()
        ]);

        obj.map(item => {
            result[Object.keys(item)[0]] = item[Object.keys(item)[0]]
        });

        res.json(result);
    }
}