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
exports.consultarMenu = void 0;
const conection_database_1 = __importDefault(require("../../../../database/conection-database"));
const response_1 = __importDefault(require("../../../../helpers/response"));
const consultarMenu = (rol, response) => __awaiter(void 0, void 0, void 0, function* () {
    const conexion = conection_database_1.default.instance;
    return new Promise((resolve, reject) => {
        conexion.connection.query({
            sql: `SELECT tsp.uuid, tsp.nombre as permiso, tsr.nombre as rol, tsm.opcion as menu, tsm.path, tsm.icono
                    FROM ts_rol_has_ts_permisos trhp
                    INNER JOIN ts_permisos tsp ON ( tsp.id =  trhp.ts_permisos_id )
                    INNER JOIN ts_rol tsr ON ( tsr.id = trhp.ts_rol_id )
                    INNER JOIN ts_permisos_has_ts_menu tphm ON ( tphm.ts_permisos_id =  tsp.id )
                    INNER JOIN ts_menu tsm ON (tsm.id = tphm.ts_menu_id )
                WHERE tsr.nombre = ?`,
            timeout: 4000,
            values: [rol]
        }, (error, respuestaDb) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (respuestaDb.length !== 0) {
                    resolve(respuestaDb);
                }
                else {
                    const data = new response_1.default();
                    data.json([], 200, response, "KO", "El usuario no dispone de permisos.");
                }
            }
            catch (error) {
                console.log("error");
            }
        }));
    });
});
exports.consultarMenu = consultarMenu;
