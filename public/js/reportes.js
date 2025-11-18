// ===============================
// DATOS BASE PARA SIMULACIÓN
// ===============================
const operadores = ["Carlos M.", "José L.", "Ana R.", "María P.", "Luis G."];
const maquinas = ["Bulldozer #12", "Excavadora #5", "Grúa", "Cargador frontal", "Retroexcavadora"];
const tiposAlertas = ["critica", "leve", "inactividad", "somnolencia"];

// Historial (se va llenando con el tiempo)
let historial = [];


// ===============================
// TARJETAS RESUMEN (DOM)
// ===============================
const cardTotalAlertas = document.querySelector("#totalAlertas");
const cardOperadorMasAlertas = document.querySelector("#operadorMasAlertas");
const cardMaquinaActiva = document.querySelector("#maquinaActiva");
const cardPorcentajeCriticas = document.querySelector("#porcentajeCriticas");


// ===============================
// GRÁFICAS (Chart.js)
// ===============================
const ctxTipo = document.getElementById("chartTipoAlertas");
const ctxHoras = document.getElementById("chartHoras");

// Contadores iniciales
let dataTipos = {
  critica: 0,
  leve: 0,
  inactividad: 0,
  somnolencia: 0
};

let dataHoras = Array(24).fill(0);

// Pie chart — distribución por tipo
const chartTipoAlertas = new Chart(ctxTipo, {
  type: "pie",
  data: {
    labels: ["Crítica", "Leve", "Inactividad", "Somnolencia"],
    datasets: [{
      data: Object.values(dataTipos),
      backgroundColor: [
        "#ef4444", // rojo
        "#fb923c", // naranja
        "#eab308", // amarillo
        "#38bdf8"  // sky azul
      ]
    }]
  },
  options: {
    responsive: true,
    plugins: { 
      legend: { labels: { color: "#fff" } }
    }
  }
});

// Bar chart — alertas por hora
const chartHoras = new Chart(ctxHoras, {
  type: "bar",
  data: {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [{
      label: "Alertas",
      data: dataHoras,
      backgroundColor: "#38bdf8"
    }]
  },
  options: {
    responsive: true,
    scales: {
      x: { ticks: { color: "#fff" } },
      y: { ticks: { color: "#fff" } }
    },
    plugins: { legend: { labels: { color: "#fff" } } }
  }
}); 


// ===============================
// TABLA DE REPORTES
// ===============================
const tabla = document.getElementById("tablaReportes");

function renderTabla() {
  tabla.innerHTML = "";

  historial.slice(-20).reverse().forEach(r => {
    const tr = document.createElement("tr");
    tr.className =
      "hover:bg-gray-800 transition-all cursor-pointer border-b border-gray-700";

    tr.innerHTML = `
      <td class="py-2 px-2">${r.fecha}</td>
      <td class="px-2">${r.operador}</td>
      <td class="px-2">${r.maquina}</td>
      <td class="px-2 font-semibold text-${r.color}-400">${r.tipoNombre}</td>
      <td class="px-2 text-blue-400 underline">Ver detalles</td>
    `;

    tabla.appendChild(tr);
  });
}


// ===============================
// FUNCIÓN PRINCIPAL DE SIMULACIÓN
// ===============================
function simularAlerta() {
  const operador = operadores[Math.floor(Math.random() * operadores.length)];
  const maquina = maquinas[Math.floor(Math.random() * maquinas.length)];
  const tipo = tiposAlertas[Math.floor(Math.random() * tiposAlertas.length)];

  // Colores compatibles con Tailwind
  const infoTipo = {
    critica: { nombre: "Crítica", color: "red" },
    leve: { nombre: "Leve", color: "orange" },       // antes "amber", pero se ve mejor "orange"
    inactividad: { nombre: "Inactividad", color: "yellow" },
    somnolencia: { nombre: "Somnolencia", color: "sky" }
  };

  const fecha = new Date();
  const hora = fecha.getHours();

  // Agregar al historial
  historial.push({
    fecha: fecha.toLocaleString(),
    operador,
    maquina,
    tipo,
    tipoNombre: infoTipo[tipo].nombre,
    color: infoTipo[tipo].color
  });

  // Actualizar contadores
  dataTipos[tipo]++;
  dataHoras[hora]++;

  // Tabla
  renderTabla();

  // Tarjetas
  actualizarTarjetas();

  // Gráficas
  chartTipoAlertas.data.datasets[0].data = Object.values(dataTipos);
  chartTipoAlertas.update();

  chartHoras.data.datasets[0].data = dataHoras;
  chartHoras.update();
}


// ===============================
// TARJETAS RESUMEN
// ===============================
function actualizarTarjetas() {
  const total = historial.length;
  cardTotalAlertas.textContent = total;

  // Operador con más alertas
  const conteoOperadores = {};
  historial.forEach(r => {
    conteoOperadores[r.operador] = (conteoOperadores[r.operador] || 0) + 1;
  });

  const operadorTop =
    Object.entries(conteoOperadores).sort((a, b) => b[1] - a[1])[0] || ["N/A", 0];

  cardOperadorMasAlertas.textContent =
    operadorTop[0] === "N/A" ? "Sin datos" : `${operadorTop[0]} (${operadorTop[1]})`;

  // Máquina más activa
  const conteoMaquinas = {};
  historial.forEach(r => {
    conteoMaquinas[r.maquina] = (conteoMaquinas[r.maquina] || 0) + 1;
  });

  const maquinaTop =
    Object.entries(conteoMaquinas).sort((a, b) => b[1] - a[1])[0] || ["N/A"];

  cardMaquinaActiva.textContent = maquinaTop[0];

  // Porcentaje de críticas
  const pct = total > 0 ? ((dataTipos.critica / total) * 100).toFixed(1) : 0;
  cardPorcentajeCriticas.textContent = `${pct}%`;
}


// ===============================
// INICIO DE SIMULACIÓN
// ===============================
setInterval(simularAlerta, 4000);
simularAlerta();
