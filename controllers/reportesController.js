// controllers/reportesController.js
export const renderReportes = (req, res) => {
  res.render("reportes", {
    title: "Generación de Reportes",
    user: { nombre: "Daniela Vargas", rol: "Administradora" }
  });
};
