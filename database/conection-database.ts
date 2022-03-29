import mysql, { MysqlError } from "mysql";
import { Response } from "express";
import CONGIG_DATABASE from "./constants/config-database";
import ResponseData from '../helpers/response';
import MysqlErrorResponse from '../interfaces/respuesta';

export default class ConecctionDatabase {
    private static _instanceDb: ConecctionDatabase;
    public connection!: mysql.Connection;
    private conn!: mysql.Connection;
    public mysqlerror?: boolean;

    constructor() {
        this.mysqlerror = false;
        this.createConnection();
    }

    public static get instance() {
        return this._instanceDb || (this._instanceDb = new this());
    }

    public createConnection() {
        this.conn = mysql.createConnection(CONGIG_DATABASE);
        this.conn.connect(( error: MysqlError  ) => {
            if(error){
                this.mysqlerror = true;                
            } else {
                this.connection =  this.conn;
            }
        });
    }
}
