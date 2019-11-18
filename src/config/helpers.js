import {
    Router
} from "express";


import {
    ArgToReal,
    UsToReal,
    ColToReal,
    EurToReal
} from '../job/workers';

import moneyCurrency from "currency.js";

/**
 * Definition of classes in order to
 * support the API with metadata and converstions
 */

export class AsyncHandler {

    static call(fn) {

        const middleware = fn => (...args) => {
            Promise.resolve(fn(...args)).catch(...args[0]);
        };

        return middleware(fn);
    }
}

export const hasSpecialChar = () => /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
export const stringToCurr = (val) => {
    if (hasSpecialChar().test(val)) {
        let currVal = val.replace('.', '').replace(',', '.');
        return parseFloat(currVal);
    }
    return parseInt(val);
}

export const stringToCurrFromReal = (val, curr) => {
    const toCurVal = (val) => {
        let curVal = 1 / val;
        if(curr == "arg") {
            console.log(currVal);
            console.log(parseFloat(1 / curVal).toFixed(4));
            return parseFloat(1 / curVal).toFixed(4);
        } else if(curr == "col") {
            console.log(currVal);
            console.log(parseFloat(1 / curVal).toFixed(5));
            return parseFloat(1 / curVal).toFixed(5);
        }
    }

    if (hasSpecialChar().test(val)) {
        let currVal = val.replace('.', '').replace(',', '.');
        return toCurVal(currVal);
    }
    
    return toCurVal(val);
}


export class ConvertToRealBtc {

    static async call(btcValue, curr) {

        const currExcpt = ["br", "brMarket", "usMarket"];

        if(currExcpt.includes(curr)) return Promise.resolve({});

        const constructors = {
            ArgToReal: ArgToReal,
            UsToReal: UsToReal,
            ColToReal: ColToReal,
            EurToReal: EurToReal
        }

        const converstionCurrency = ['usToReal', 'argToReal', 'colToReal', 'eurToReal'];

        const result = {};

        return new Promise((resolve, reject) => {

            if (btcValue) {

                const findCurrency = c => c.startsWith(curr);
                const capitalize = (s) => {
                    if (typeof s !== 'string') return ''
                    return s.charAt(0).toUpperCase() + s.slice(1)
                };
                const getConversionValue = async () => await new constructors[ConvertionClass]().execute();
                const keyName = converstionCurrency.find(findCurrency);
                const ConvertionClass = capitalize(keyName);

                getConversionValue()
                    .then(value => {

                        let convertionMult = 
                            (stringToCurr(btcValue) * 
                            (curr == "arg" || curr == "col") ? 
                                stringToCurrFromReal(value[keyName]) : 
                                stringToCurr(value[keyName]))

                        result["convertedReal"] =
                            moneyCurrency(convertionMult, {
                                decimal: ',',
                                separator: '.',
                                // precision: 3
                            }).format();
                        result["currencyToReal"] = value[keyName]

                        resolve(result);
                    });
            } else {

                resolve({});
            }
        });
    }
}


export class Routes extends Router {
    constructor() {
        super();
    }

    route(...args) {
        return super.route(...args);
    }

    __asyncHandler(fn) {
        const middleware = fn => (req, res, next) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        };

        return middleware(fn);
    }

    get(fn) {
        return super.get(this.__asyncHandler(fn));
    }

    post(fn) {
        return super.post(this.__asyncHandler(fn));
    }

    put(fn) {
        return super.put(this.__asyncHandler(fn));
    }
}