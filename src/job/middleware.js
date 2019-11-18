import puppeteer from "puppeteer";

export default class Middleware {

    constructor() {

        this.__simulator = null;
        this.__instance = null;
        this.__url = null;
    }

    async prepare() {

        this.__simulator = await puppeteer.launch({ headless: true, args: ['--no-sandbox', 'disable-setuid-sandbox'] });
        this.__instance = await this.__simulator.newPage();

        await this.__instance.setViewport({ width: 1920, height: 926 });
        await this.__instance.goto(this.__url);
    }

    execute() {

        throw new Error("This methods needs to be overwrite");
    }
}