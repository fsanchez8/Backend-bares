import { Response } from "express";
import ConecctionDatabase from '../../../../database/conection-database';
import { MysqlError } from 'mysql';
import ResponseData from '../../../../helpers/response';

export const consultarMenu = async ( rol:string, response:Response  ) => {
    const conexion  =  ConecctionDatabase.instance;
    return new Promise((resolve, reject)=>{
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
        },async (error: MysqlError, respuestaDb: any) => {
            
                try {
                    if(respuestaDb.length !== 0){
                        resolve(respuestaDb)
                    } else {
                        const data = new ResponseData();
                        data.json([], 200, response, "KO", "El usuario no dispone de permisos.");
                    }
                } catch (error) {
                    console.log("error");
                    
                }
            
        })
    })
}


