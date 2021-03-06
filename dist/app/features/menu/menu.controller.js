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
exports.menu = void 0;
const consultar_menu_1 = require("./controllers/consultar-menu");
const response_1 = __importDefault(require("../../../helpers/response"));
const menu = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("entra a la api");
    yield (0, consultar_menu_1.consultarMenu)(request.body.rol, response).then(respuesta => {
        try {
            const data = new response_1.default();
            data.json(respuesta, 200, response, "OK", "Información consultada con éxito");
        }
        catch (error) {
            console.log("error");
        }
    });
});
exports.menu = menu;
