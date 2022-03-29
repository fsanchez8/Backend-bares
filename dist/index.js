"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const servidor_1 = __importDefault(require("./app/server/servidor"));
const routes_1 = require("./routes/routes");
const server = servidor_1.default.instance;
// configuración
server.app.use(express_1.default.urlencoded({ extended: true }));
server.app.use(express_1.default.json());
server.app.use(body_parser_1.default.urlencoded({ extended: false }));
server.app.use((0, cors_1.default)());
// rutas
server.app.use('/api/auth', routes_1.LOGIN);
server.app.use('/api/seguridad', routes_1.MENU);
// iniciar app
server.start(() => {
    console.log("servidor corriendo en el puerto", server.port);
});
