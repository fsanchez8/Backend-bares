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
exports.validarLogin = void 0;
const conection_database_1 = __importDefault(require("../../../../database/conection-database"));
const validarConexion_1 = require("../../../server/validarConexion");
const crypt_1 = require("../../../../helpers/crypt");
const login_model_1 = __importDefault(require("../model/login.model"));
const jwt_1 = require("../../../../helpers/jwt");
const validarLogin = (email, password, response) => __awaiter(void 0, void 0, void 0, function* () {
    const conexion = conection_database_1.default.instance;
    (0, validarConexion_1.validarConexionBaseDeDatos)(conexion.mysqlerror, response);
    return new Promise((resolve, reject) => {
        conexion.connection.query({
            sql: `SELECT 
                    tsu.email, 
                    tsc.contrasena,
                    tsc.estado as estadoPass,
                    tsig.p_nombre, 
                    tsig.p_apellido,
                    tstd.nombre as tipo_documento,
                    tstd.n_corto,
                    tsig.docuemento,
                    tsr.nombre as rol, 
                    tsu.ip_remota, 
                    tsu.intentos_login,
                    tsu.online,
                    tsu.uuid
                FROM ts_usuarios tsu
                LEFT JOIN  ts_contrasenas tsc ON (tsc.ts_usuarios_id = tsu.id)
                LEFT JOIN ts_informacion_general tsig ON (tsig.id = tsu.ts_informacion_general_id)
                LEFT JOIN ts_rol tsr ON (tsr.id = tsu.ts_rol_id)
                LEFT JOIN ts_tipo_documento tstd ON (tstd.id = tsig.ts_tipo_documento_id )
                WHERE email = ? `,
            timeout: 4000,
            values: [email],
        }, (error, respuestaDb) => __awaiter(void 0, void 0, void 0, function* () {
            const consulta = respuestaDb;
            (0, crypt_1.decryptPassword)(password, consulta[0]['contrasena']).then((respuesta) => __awaiter(void 0, void 0, void 0, function* () {
                if (respuesta) {
                    const data = new login_model_1.default;
                    let token = yield (0, jwt_1.generarJWT)(consulta[0]['uuid'], consulta[0]['contrasena'], consulta[0]['contrasena']);
                    data.uuid = consulta[0]['uuid'];
                    data.p_nombre = consulta[0]['p_nombre'];
                    data.p_apellido = consulta[0]['p_apellido'];
                    data.tipo_documento = consulta[0]['tipo_documento'];
                    data.nombre_corto_documento = consulta[0]['n_corto'];
                    data.email = consulta[0]['email'];
                    data.docuemento = consulta[0]['docuemento'];
                    data.rol = consulta[0]['rol'];
                    data.ip_remota = consulta[0]['ip_remota'];
                    data.intentos_login = consulta[0]['intentos_login'];
                    data.online = consulta[0]['online'];
                    data.token = token;
                    resolve(data);
                }
                else {
                    console.log("no");
                }
            }));
        }));
    });
});
exports.validarLogin = validarLogin;
