import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { SECRETKEY } from '../environments/environments';
import ResponseData from '../helpers/response';

export const validarJwt = (req: Request, res: Response, next: Function)=>{
    const token = req.header('authorization');
    try {
        const isValid = jwt.verify(token!, SECRETKEY);
        if(isValid){
            next();
        }else{
            const data = new ResponseData();
            data.json( [], 401, res, "KO", "No se proporcionó un token válido.");
        }
    } catch (error) {
        const data = new ResponseData();
        data.json( [], 401, res, "KO", "No se proporcionó un token válido."); 
    }
}