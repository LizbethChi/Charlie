import express from "express";
import { formularioLogin, autenticarUsuario, cerrarSesion } from "../controllers/authController.js";

const router = express.Router();

router.get("/login", formularioLogin);
router.post("/login", autenticarUsuario);
router.get("/logout", cerrarSesion);

export default router;
