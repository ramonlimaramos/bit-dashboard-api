 import Middleware from "../job/middleware";
 //import cheerio from "cheerio";


 export class BTCBrazil extends Middleware {

     constructor() {

         super();
         super.__url = "https://www.google.com/search?q=BTC&rlz=1C1GCEU_pt-BRBR819BR819&oq=BTC&aqs=chrome..69i57j69i59l3j0j69i61.3541j1j7&sourceid=chrome&ie=UTF-8";
     }

     async execute() {
         await this.prepare();
         let result = await this.__instance.evaluate(() => {

             try {

                 let br = document.querySelector("span[data-precision='2']").innerText;
                 return {
                     br
                 };

             } catch (error) {

                 console.error(error);
             }
         });
         this.__simulator.close();
         return result;
     }
 }


 export class BTCUsa extends Middleware {

    constructor() {

        super();
        super.__url = "https://www.google.com/search?q=btc+dollar&oq=btc+doll&aqs=chrome.0.69i59j0j69i57j0l3.1934j0j4&sourceid=chrome&ie=UTF-8";
    }

    async execute() {
        await this.prepare();
        let result = await this.__instance.evaluate(() => {

            try {

                let us = document.querySelector("span[data-precision='2']").innerText;
                return {
                    us
                };

            } catch (error) {

                console.error(error);
            }
        });
        this.__simulator.close();
        return result;
    }
}


export class BTCEuro extends Middleware {

    constructor() {

        super();
        super.__url = "https://www.google.com.br/search?source=hp&ei=GD6uXfaaLKHN5OUPvqm56AQ&q=btc+euro&oq=btc+euro&gs_l=psy-ab.3..0j0i22i30l3j0i22i10i30j0i22i30j0i22i10i30l2j0i22i30j0i22i10i30.1207.4076..4375...1.0..0.309.1906.0j4j4j1......0....1..gws-wiz.......0i131j0i10j0i19.0QfBB4Pla3w&ved=0ahUKEwj2hpPYv67lAhWhJrkGHb5UDk0Q4dUDCAY&uact=5";
    }

    async execute() {
        await this.prepare();
        let result = await this.__instance.evaluate(() => {

            try {

                let eur = document.querySelector("span[data-precision='2']").innerText;
                return {
                    eur
                };

            } catch (error) {

                console.error(error);
            }
        });
        this.__simulator.close();
        return result;
    }
}


 export class BTCArgentina extends Middleware {

     constructor() {

         super();
         super.__url = "https://www.google.com/search?ei=iQSlXcuqCP_A5OUPs9KzwAo&q=btc+argentina+valor&oq=btc+argentina+valor&gs_l=psy-ab.3..33i160.2096.3109..3249...0.2..0.122.617.3j3......0....1..gws-wiz.......0i71j0i19j0i22i30i19j0i22i10i30i19j33i22i29i30j33i21.Jx4AxEs2PQ8&ved=0ahUKEwiLk9bD85zlAhV_ILkGHTPpDKgQ4dUDCAs&uact=5";
     }

     async execute() {
         await this.prepare();
         let result = await this.__instance.evaluate(() => {

             try {

                 let arg = document.querySelector("span[data-precision='2']").innerText;
                 return {
                     arg
                 };

             } catch (error) {

                 console.error(error);
             }
         });
         this.__simulator.close();
         return result;
     }
 }


 export class BTCColombia extends Middleware {

     constructor() {

         super();
         super.__url = "https://www.google.com/search?ei=jASlXdCgPIbB5OUP8OizuAs&q=btc+colombia+valor&oq=btc+colombia+valor&gs_l=psy-ab.3..0i8i7i30j0i8i30l2j0i8i10i30.1471706.1473050..1473247...0.0..0.110.782.5j3......0....1..gws-wiz.......0i8i7i10i30j0i8i13i30.xNILZih4_F8&ved=0ahUKEwjQlsHF85zlAhWGILkGHXD0DLcQ4dUDCAs&uact=5";
     }

     async execute() {
         await this.prepare();
         let result = await this.__instance.evaluate(() => {

             try {

                 let col = document.querySelector("span[data-precision='2']").innerText;
                 return {
                     col
                 };

             } catch (error) {

                 console.error(error);
             }
         });
         this.__simulator.close();
         return result;
     }
 }


 export class Brokerages extends Middleware {

     constructor() {

         super();
         super.__url = "https://www.cointradermonitor.com/preco-bitcoin-brasil";
     }

     async execute() {
         await this.prepare();
         this.__instance.on('console', msg => {
             for (let i = 0; i < msg.args().length; ++i)
                 console.log(`${i}: ${msg.args()[i]}`);
         });
         let result = await this.__instance.evaluate(() => {

             try {
                 
                let columns = [];
                let thds = document.querySelectorAll('#exchangerank>thead>tr>th');

                [].forEach.call(thds, th => {
                    if(typeof(th.innerText) == 'string' && th.innerText)
                        columns.push(th.innerText);
                });
                
                let rows = [];
                let tableRows = document.querySelectorAll('#exchangerank>tbody>tr');



                for (r = 0; r < tableRows.length; r++) {
                    let cells = tableRows[r].querySelectorAll("td");
                    rows[r] = {};

                    for (c = 0; c < cells.length; c++) {
                        rows[r][thds[c].innerText] = cells[c].innerText;
                        
                    }
                }

                rows = rows.map(row => {
                    delete row[""];
                    return row;
                });

                return rows;

             } catch (error) {

                 console.error(error);
             }
         });
         this.__simulator.close();
         return result;
     }
 }


 export class CoinTradeBTC extends Middleware {

    constructor() {

        super();
        super.__url = "https://www.cointradermonitor.com/preco-bitcoin-brasil";
    }

    async execute() {
        await this.prepare();
        let result = await this.__instance.evaluate(() => {

            try {
                
                let coinTrade = document.getElementById("coin_price_display").innerText;
                return { coinTrade };

            } catch (error) {

                console.error(error);
            }
        });
        this.__simulator.close();
        return result;
    }
}


 export class ArgToReal extends Middleware {

    constructor() {

        super();
        //super.__url = "https://www.google.com/search?q=peso+argentino+real&oq=peso+argentino+&aqs=chrome.1.69i57j0l3j69i61l2.6201j1j7&sourceid=chrome&ie=UTF-8";
        super.__url = "https://www.google.com/search?q=real+para+peso+argentino&rlz=1C1GCEU_pt-BRBR819BR819&oq=real+para+peso+argentino&aqs=chrome.0.69i59j0l5.6719j0j7&sourceid=chrome&ie=UTF-8";
    }

    async execute() {
        await this.prepare();
        let result = await this.__instance.evaluate(() => {

            try {

                let argToReal = document.querySelector("span[class='DFlfde SwHCTb']").innerText;
                return {
                    argToReal
                };

            } catch (error) {

                console.error(error);
            }
        });
        this.__simulator.close();
        return result;
    }
}

export class UsToReal extends Middleware {

    constructor() {

        super();
        super.__url = "https://www.google.com/search?sxsrf=ACYBGNTOErPYDrQ7Sqvj7X748Ql7qD1yNg%3A1572303909885&ei=JXS3Xf2-Nfqf5OUP-IaG6As&q=dollar+para+real&oq=dollar+para+real&gs_l=psy-ab.3..0i71l8.0.0..56108...0.3..0.0.0.......0......gws-wiz.TlKTAvL4Al8&ved=0ahUKEwi95ZvAiMDlAhX6D7kGHXiDAb0Q4dUDCAs&uact=5";
    }

    async execute() {
        await this.prepare();
        let result = await this.__instance.evaluate(() => {

            try {

                let usToReal = document.querySelector("span[class='DFlfde SwHCTb']").innerText;
                return {
                    usToReal
                };

            } catch (error) {

                console.error(error);
            }
        });
        this.__simulator.close();
        return result;
    }
}

export class ColToReal extends Middleware {

    constructor() {

        super();
        //super.__url = "https://www.google.com/search?sxsrf=ACYBGNTTqhjrDWOCkNSl2SubWF8idZDtRw%3A1572307270302&ei=RoG3XZKNEtHO5OUP6N-TiAc&q=peso+colombiano+para+real&oq=peso+col&gs_l=psy-ab.3.0.35i39i70i258j0l9.331598.333303..335277...1.1..0.118.970.1j8......0....1..gws-wiz.......0i71j35i39j0i131j0i67j0i131i67.pdoUCBv4uUw";
        super.__url = "https://www.google.com/search?rlz=1C1GCEU_pt-BRBR819BR819&sxsrf=ACYBGNQw9EdndqC8ZO4Qk_QoySEqPjwO2Q%3A1573622610169&ei=UpPLXa31CezW5OUPx8Cj8Ag&q=real+para+peso+colombiano&oq=real+para+peso+colombiano&gs_l=psy-ab.3..35i39j0i203j0i22i30l8.327727.334027..334537...1.3..1.385.4677.0j16j4j4......0....1..gws-wiz.......0i71j0j0i67j0i20i263j0i273j0i22i10i30j35i304i39j0i13i30j0i13i5i30.d0U15y0bA1s&ved=0ahUKEwit5sGFueblAhVsK7kGHUfgCI4Q4dUDCAs&uact=5";
    }

    async execute() {
        await this.prepare();
        let result = await this.__instance.evaluate(() => {

            try {

                let colToReal = document.querySelector("span[class='DFlfde SwHCTb']").innerText;
                return {
                    colToReal
                };

            } catch (error) {

                console.error(error);
            }
        });
        this.__simulator.close();
        return result;
    }
}

export class EurToReal extends Middleware {

    constructor() {

        super();
        super.__url = "https://www.google.com/search?sxsrf=ACYBGNQdD1uN-XLzH69kqGXf6lklVwA17g%3A1572307000075&ei=OIC3XZ-XBOPB5OUPg_CLmA0&q=eur+para+real&oq=eur+para+real&gs_l=psy-ab.3..0i71l8.269082.269381..269510...0.1..0.172.339.0j2......0....1..gws-wiz.56RzUTAGovM&ved=0ahUKEwifk96BlMDlAhXjILkGHQP4AtMQ4dUDCAs&uact=5";
    }

    async execute() {
        await this.prepare();
        let result = await this.__instance.evaluate(() => {

            try {

                let eurToReal = document.querySelector("span[class='DFlfde SwHCTb']").innerText;
                return {
                    eurToReal
                };

            } catch (error) {

                console.error(error);
            }
        });
        this.__simulator.close();
        return result;
    }
}
