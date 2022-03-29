"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environments_1 = require("../environments/environments");
const generarJWT = (uid = "", primerNombre, primerApellido) => {
    return new Promise((resolve, reject) => {
        const payload = {
            uid,
            primerNombre,
            primerApellido,
        };
        jsonwebtoken_1.default.sign(payload, environments_1.SECRETKEY, {
            expiresIn: "1m",
        }, (err, token) => {
            console.log(err);
            if (err) {
                reject("No se pudo generar el token");
            }
            else {
                return resolve(token);
            }
        });
    });
};
exports.generarJWT = generarJWT;
