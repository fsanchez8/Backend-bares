
import { Router } from "express";
import { Login } from '../app/features/auth/login.controller';
import { menu } from '../app/features/menu/menu.controller';

const router = Router();

export const LOGIN = router.post("/login", Login);
export const MENU =  router.post("/menu", menu )

