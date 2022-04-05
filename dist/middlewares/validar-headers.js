"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateHeader = void 0;
const response_1 = __importDefault(require("../helpers/response"));
const validateHeader = (req, res, next) => {
    if (req.header('authorization')) {
        next();
    }
    else {
        const data = new response_1.default();
        data.json([], 405, res, "KO", "No se proporcionó una cabecera necesaria para el consumo de la api rest");
    }
};
exports.validateHeader = validateHeader;
