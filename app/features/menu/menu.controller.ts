import { Request, Response } from "express";
import { consultarMenu } from './controllers/consultar-menu';
import ResponseData from '../../../helpers/response';

export const menu = async (request: Request, response: Response) => {
    console.log("entra a la api");
    
    await consultarMenu(request.body.rol, response).then(respuesta => {
        try {
            const data = new ResponseData();
            data.json(respuesta, 200, response, "OK", "Información consultada con éxito");
        } catch (error) {
            console.log("error");

        }


    })

}