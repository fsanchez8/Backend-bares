import { Request, Response } from "express";
import ResponseData from "../../../helpers/response";
import { validarLogin } from './controller/validar-login';

export const Login = async ( request:Request, response: Response ) => {
    console.log(request.body);
    
    await validarLogin(request.body.email, request.body.password, response).then(respuesta =>{
        const data = new ResponseData();
        if(respuesta === null){
            return data.json(respuesta, 401, response, "KO", "Datos de conexión incorrectos." );
        }
        return data.json(respuesta, 200, response, "OK", "Información consultada con éxito" );
    })
}