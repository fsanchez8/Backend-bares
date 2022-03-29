"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environments_1 = require("../../environments/environments");
const CONGIG_DATABASE = {
    host: environments_1.HOST,
    user: environments_1.USER,
    password: environments_1.PASSWORD,
    database: environments_1.DATABASE,
    debug: false
};
exports.default = CONGIG_DATABASE;
