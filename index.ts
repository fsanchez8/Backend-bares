
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import Servidor from './app/server/servidor';
import { LOGIN, MENU } from './routes/routes';

const server = Servidor.instance;


// configuración
server.app.use( express.urlencoded({ extended: true }));
server.app.use( express.json() );
server.app.use( bodyParser.urlencoded({ extended: false }))
server.app.use(cors());
// rutas
server.app.use('/api/auth' , LOGIN );
server.app.use('/api/seguridad' , MENU );
// iniciar app
server.start(()=>{
    console.log("servidor corriendo en el puerto", server.port );    
})