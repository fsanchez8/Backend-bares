"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarConexionBaseDeDatos = void 0;
const environments_1 = require("./../../environments/environments");
const response_1 = __importDefault(require("../../helpers/response"));
const respuesta_1 = __importDefault(require("../../interfaces/respuesta"));
const validarConexionBaseDeDatos = (status, res) => {
    if (status) {
        const data = new response_1.default;
        let datos = new respuesta_1.default();
        datos.codigo = "ER_BAD_DB_ERROR";
        datos.exception = `Unknown database ${environments_1.DATABASE}`;
        datos.message = null;
        datos.response = [];
        data.json(datos, 200, res);
        throw new Error(`ER_BAD_DB_ERROR ${datos.exception}`);
    }
};
exports.validarConexionBaseDeDatos = validarConexionBaseDeDatos;
