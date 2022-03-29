"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const config_database_1 = __importDefault(require("./constants/config-database"));
class ConecctionDatabase {
    constructor() {
        this.mysqlerror = false;
        this.createConnection();
    }
    static get instance() {
        return this._instanceDb || (this._instanceDb = new this());
    }
    createConnection() {
        this.conn = mysql_1.default.createConnection(config_database_1.default);
        this.conn.connect((error) => {
            if (error) {
                this.mysqlerror = true;
            }
            else {
                this.connection = this.conn;
            }
        });
    }
}
exports.default = ConecctionDatabase;
