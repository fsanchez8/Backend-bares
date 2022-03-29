"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseData {
    json(data, errorHttp, response, codigo, mensaje) {
        return response.status(errorHttp).json({
            codigo: codigo,
            mensaje: mensaje,
            response: data
        });
    }
}
exports.default = ResponseData;
