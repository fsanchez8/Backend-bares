"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const environments_1 = require("../../environments/environments");
const conection_database_1 = __importDefault(require("../../database/conection-database"));
class Servidor {
    constructor() {
        this.idNavegador = "";
        this.app = (0, express_1.default)();
        this.port = environments_1.SERVER_PORT;
        this.httpServer = http_1.default.createServer(this.app);
        this.io = new socket_io_1.Server(this.httpServer, {
            cors: {
                origin: ["http://localhost"],
                methods: ["GET", "POST"],
            },
            allowEIO3: true,
            pingInterval: 2500,
            pingTimeout: 2500,
            cookie: {
                name: "localhost",
                httpOnly: false,
                secure: true
            }
        });
        this.escucharSockets();
        this.intanceDb = conection_database_1.default.instance;
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    start(callback) {
        this.httpServer.listen(this.port, callback);
    }
    escucharSockets() {
        this.io.on('connect', (cliente) => {
            console.log("cliente conectado", cliente.id);
            this.idNavegador = cliente.id;
        });
    }
}
exports.default = Servidor;
