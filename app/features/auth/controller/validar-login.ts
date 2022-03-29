
import { MysqlError } from 'mysql';
import ConecctionDatabase from '../../../../database/conection-database';
import { Response } from 'express';
import { validarConexionBaseDeDatos } from '../../../server/validarConexion';
import {  decryptPassword } from '../../../../helpers/crypt';
import LoginModel from '../model/login.model';
import { generarJWT } from '../../../../helpers/jwt';

export const validarLogin = async ( email:string, password: string, response: Response  ) => {
    const conexion  =  ConecctionDatabase.instance;
    validarConexionBaseDeDatos(conexion.mysqlerror!, response);
    return new Promise(( resolve, reject )=>{
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
            values : [email],
        },async (error: MysqlError, respuestaDb: any) => {   
            const consulta = respuestaDb; 
            if(respuestaDb.length > 0){
                decryptPassword (password, consulta[0]['contrasena']).then(async(respuesta: any) => {
                        if(respuesta){
                            const data: LoginModel = new LoginModel;
                            let token = await generarJWT(consulta[0]['uuid'], consulta[0]['contrasena'], consulta[0]['contrasena'])
                            data.uuid       = consulta[0]['uuid']
                            data.p_nombre   = consulta[0]['p_nombre']
                            data.p_apellido = consulta[0]['p_apellido']
                            data.tipo_documento = consulta[0]['tipo_documento']
                            data.nombre_corto_documento = consulta[0]['n_corto']
                            data.email = consulta[0]['email']
                            data.docuemento = consulta[0]['docuemento']
                            data.rol = consulta[0]['rol']
                            data.ip_remota = consulta[0]['ip_remota']
                            data.intentos_login = consulta[0]['intentos_login']
                            data.online = consulta[0]['online']
                            data.token = token ;
                            resolve(data);
                        } else {
                            resolve(null);
                            
                        }
                })
            }else {
               resolve(null)
                
            }
        })
    })
}