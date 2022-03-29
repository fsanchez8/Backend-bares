"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
const response_1 = __importDefault(require("../../../helpers/response"));
const validar_login_1 = require("./controller/validar-login");
const Login = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, validar_login_1.validarLogin)(request.body.email, request.body.password, response).then(respuesta => {
        const data = new response_1.default();
        data.json(respuesta, 200, response, "OK", "Información consultada con éxito");
    });
});
exports.Login = Login;
