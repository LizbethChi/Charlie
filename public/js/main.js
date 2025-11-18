// ===============================
// ELEMENTOS DEL DOM
// ===============================
const overlay = document.getElementById("modalOverlay");
const content = document.getElementById("modalContent");
const alertContainer = document.getElementById("alertContainer");

// Tarjetas
const cardOperadores = document.getElementById("tarjetaOperadores");
const cardMaquinas = document.getElementById("tarjetaMaquinas");
const cardCriticas = document.getElementById("tarjetaCriticas");
const cardAlertas = document.getElementById("tarjetaAlertas");

// ===============================
// DATOS SIMULADOS
// ===============================
const operadores = ["Carlos Ruiz", "Ana López", "Pedro García", "Lucía Martínez"];
const estados = ["Distracción severa", "Atención baja", "Actividad normal"];
const maquinas = ["Excavadora #12", "Camión #3", "Grúa #5", "Retroexcavadora #8"];
const descripciones = [
  "Desviación de mirada detectada más de 4 segundos.",
  "Oscilaciones en patrón de atención, posible cansancio.",
  "Sin anomalías detectadas. Atención estable.",
  "Movimiento irregular detectado, revisar supervisión."
];

// Colores UNI → Tailwind
const colores = {
  "Distracción severa": "red",
  "Atención baja": "yellow",
  "Actividad normal": "blue"
};

const iconos = {
  "Distracción severa": "warning",
  "Atención baja": "priority_high",
  "Actividad normal": "check_circle"
};

// ===============================
// GRÁFICA (Chart.js)
// ===============================
const ctx = document.getElementById("chartAlertas");
let alertHistory = [];

const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Alertas por minuto",
        data: [],
        borderWidth: 2,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.3
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#ccc" }
      },
      x: {
        ticks: { color: "#ccc" }
      }
    },
    plugins: {
      legend: { labels: { color: "#ddd" } }
    }
  }
});

// Agregar un punto a la gráfica
function actualizarGrafica() {
  const minutos = new Date().toLocaleTimeString([], { minute: "2-digit", second: "2-digit" });

  chart.data.labels.push(minutos);
  chart.data.datasets[0].data.push(1);

  if (chart.data.labels.length > 10) {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift();
  }

  chart.update();
}

// ===============================
// GENERAR ALERTA SIMULADA
// ===============================
function generarAlerta() {
  const nombre = operadores[Math.floor(Math.random() * operadores.length)];
  const estado = estados[Math.floor(Math.random() * estados.length)];
  const maquina = maquinas[Math.floor(Math.random() * maquinas.length)];
  const desc = descripciones[Math.floor(Math.random() * descripciones.length)];
  const hora = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const edad = Math.floor(Math.random() * 20) + 25;
  const exp = Math.floor(Math.random() * 10) + 1;

  const color = colores[estado];
  const icono = iconos[estado];

  // Crear alerta
  const div = document.createElement("div");
  div.className = `
    flex items-center gap-2 p-3 rounded-lg
    bg-${color}-500/10
    border border-${color}-500/20
    text-${color}-400
    cursor-pointer hover:bg-${color}-500/20 transition
  `;

  div.dataset.name = nombre;
  div.dataset.status = estado;
  div.dataset.machine = maquina;
  div.dataset.time = hora;
  div.dataset.age = edad;
  div.dataset.exp = `${exp} años`;
  div.dataset.desc = desc;

  div.innerHTML = `
    <span class="material-symbols-outlined">${icono}</span>
    <span><b>${estado}</b> detectada en ${nombre}</span>
  `;

  alertContainer.prepend(div);

  // ===========================
  // ACTUALIZAR TARJETAS
  // ===========================
  cardAlertas.innerText = alertContainer.children.length;

  // Críticas → solo “Distracción severa”
  const criticas = [...alertContainer.children].filter(a => a.dataset.status === "Distracción severa").length;
  cardCriticas.innerText = criticas;

  // Operadores activos = 4 (simulado)
  cardOperadores.innerText = 4;

  // Máquinas en uso = 3 (simulado)
  cardMaquinas.innerText = 3;

  // ===========================
  // MODAL
  // ===========================
  div.onclick = () => {
    document.getElementById("modalNombre").innerText = div.dataset.name;
    document.getElementById("modalEstado").innerText = div.dataset.status;
    document.getElementById("modalMaquina").innerText = div.dataset.machine;
    document.getElementById("modalFecha").innerText = div.dataset.time;
    document.getElementById("modalEdad").innerText = div.dataset.age;
    document.getElementById("modalExp").innerText = div.dataset.exp;
    document.getElementById("modalDescripcion").innerText = div.dataset.desc;

    overlay.classList.remove("hidden");
    setTimeout(() => content.classList.remove("scale-95", "opacity-0"), 10);
  };

  // Agregar punto a la gráfica
  actualizarGrafica();
}

// Generar alertas cada 3 segundos
setInterval(generarAlerta, 3000);

// ===============================
// CERRAR MODAL
// ===============================
document.getElementById("closeModal").onclick = () => {
  content.classList.add("scale-95", "opacity-0");
  setTimeout(() => overlay.classList.add("hidden"), 150);
};

overlay.onclick = e => {
  if (e.target === overlay) {
    content.classList.add("scale-95", "opacity-0");
    setTimeout(() => overlay.classList.add("hidden"), 150);
  }
};
