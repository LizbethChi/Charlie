// index.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de vistas
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Rutas
app.use("/", dashboardRoutes);

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
