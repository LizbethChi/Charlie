// controllers/dashboardController.js

export const mostrarDashboard = (req, res) => {
  res.render("dashboard", {
    title: "Fleet Monitor Dashboard",
  });
};

export const reportes = (req, res) => {
  res.render("reportes", {
    title: "Reportes - Fleet Monitor",
  });
};

export const operadores = (req, res) => {
  res.render("operadores", {
    title: "Operadores",
  });
}

export const configuracion = (req, res) => {
  res.render("configuracion", {
    title: "Configuración - Fleet Monitor"
  });
};
