import ServerIO from "socket.io";

class Socket {
    constructor(httpServer) {
        this.__httpServer = httpServer || 4001;
        this.__io = this.__setSocket();
        Object.freeze(this);
    }

    __setSocket() {
        return new ServerIO(this.__httpServer, {
            pingInterval: 10000,
            pingTimeout: 5000,
            cookie: false
        });
    }

    get httpServer() {
        return this.__httpServer;
    }

    get io() {
        return this.__io;
    }
}


class SingleTon {
    constructor(httpServer) {
        if(!SingleTon.instance)
            SingleTon.instance = new Socket(httpServer);
    }

    getInstance() {
        return SingleTon.instance;
    }
}

module.exports = SingleTon;