import express from 'express';
import http from 'http';
import {Server} from 'socket.io'
import { SERVER_PORT } from '../../environments/environments';
import ConecctionDatabase from '../../database/conection-database';


export default class Servidor {
    
    public app               : express.Application;
    public port!              : number;
    public io                : Server
    private httpServer       : http.Server
    private static _instance : Servidor
    public idNavegador       : string;
    private intanceDb : ConecctionDatabase

    constructor(){
        this.idNavegador = "";
        this.app = express();
        this.port = SERVER_PORT
        this.httpServer = http.createServer(this.app);
        this.io = new Server(this.httpServer, {
            cors: {
                origin: ["http://localhost"],
                methods: ["GET", "POST"],
            }, 
            allowEIO3: true,
            pingInterval: 2500,
            pingTimeout : 2500,
            cookie: {
                name: "localhost",
                httpOnly: false,
                secure: true
            }
        })
        this.escucharSockets(); 
        this.intanceDb = ConecctionDatabase.instance;
    }

    public static get instance(){
        return this._instance || (this._instance =  new this())
    }

    public start(callback: Function | any){
        this.httpServer.listen(this.port, callback);
    }

    public escucharSockets(){
        this.io.on('connect', (cliente)=>{
            console.log("cliente conectado", cliente.id );
            this.idNavegador = cliente.id
        })
    }
}