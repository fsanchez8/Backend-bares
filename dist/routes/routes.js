"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MENU = exports.LOGIN = void 0;
const express_1 = require("express");
const login_controller_1 = require("../app/features/auth/login.controller");
const menu_controller_1 = require("../app/features/menu/menu.controller");
const router = (0, express_1.Router)();
exports.LOGIN = router.post("/login", login_controller_1.Login);
exports.MENU = router.post("/menu", menu_controller_1.menu);
