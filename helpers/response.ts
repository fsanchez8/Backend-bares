import { Response } from "express";

export default class ResponseData<T>  {
        
    public json( data: T , errorHttp: number, response? : Response , codigo?: string, mensaje?: string | null  ){
        return response!.status(errorHttp).json({
            codigo: codigo,
            mensaje: mensaje,
            response: data
        })
    }   
}