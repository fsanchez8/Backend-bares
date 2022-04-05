import { Request, Response } from "express";
import ResponseData from '../helpers/response';


export const validateHeader = (req: Request, res: Response, next: Function)=>{

    if(req.header('authorization')){
        next();
    }  else {
        const data = new ResponseData();
        data.json( [], 405, res, "KO", "No se proporcionó una cabecera necesaria para el consumo de la api rest");
    }
}