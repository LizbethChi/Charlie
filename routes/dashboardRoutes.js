// routes/dashboardRoutes.js
import express from "express";
import { mostrarDashboard, reportes, operadores, configuracion } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/dashboard", mostrarDashboard);
router.get("/", (req, res) => res.redirect("/dashboard"));

router.get('/reportes', reportes);


router.get('/operadores', operadores);

router.get('/configuracion', configuracion);



export default router;
