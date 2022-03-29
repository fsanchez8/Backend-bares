"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptPassword = exports.encryptPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const encryptPassword = (password) => {
    const salt = bcryptjs_1.default.genSaltSync(10);
    return bcryptjs_1.default.hashSync(password, salt);
};
exports.encryptPassword = encryptPassword;
const decryptPassword = (password, salt) => {
    return new Promise((resolve, reject) => {
        const pass = bcryptjs_1.default.compareSync(password, salt);
        if (pass) {
            resolve(true);
        }
        else {
            resolve(false);
        }
        reject();
    });
};
exports.decryptPassword = decryptPassword;
