"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environments_1 = require("../environments/environments");
const response_1 = __importDefault(require("../helpers/response"));
const validarJwt = (req, res, next) => {
    const token = req.header('authorization');
    try {
        const isValid = jsonwebtoken_1.default.verify(token, environments_1.SECRETKEY);
        if (isValid) {
            next();
        }
        else {
            const data = new response_1.default();
            data.json([], 401, res, "KO", "No se proporcionó un token válido.");
        }
    }
    catch (error) {
        const data = new response_1.default();
        data.json([], 401, res, "KO", "No se proporcionó un token válido.");
    }
};
exports.validarJwt = validarJwt;
