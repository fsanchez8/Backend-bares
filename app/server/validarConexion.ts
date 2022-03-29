import { DATABASE } from './../../environments/environments';
import ResponseData from '../../helpers/response';
import RespuestaGeneral from '../../interfaces/respuesta';
import {Response} from 'express'

export const validarConexionBaseDeDatos = (status: boolean, res: Response) =>{
    if(status){
        const data = new ResponseData;
        let datos = new RespuestaGeneral()
        datos.codigo    = "ER_BAD_DB_ERROR"
        datos.exception =  `Unknown database ${DATABASE}`
        datos.message   =  null
        datos.response  = []
        data.json(datos!, 200, res );
        throw new Error(`ER_BAD_DB_ERROR ${datos.exception}`)
    } 
}