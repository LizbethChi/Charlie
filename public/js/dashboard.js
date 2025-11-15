document.addEventListener("DOMContentLoaded", () => {
  const estadoOperador = document.getElementById("estadoOperador");
  const nivelAtencion = document.getElementById("nivelAtencion");
  const alertasList = document.getElementById("alertasList");

  // Simular actualización de datos cada 5 segundos
  setInterval(() => {
    const randomFocus = Math.random() > 0.2;
    const attentionLevel = Math.floor(Math.random() * 40) + 60;

    estadoOperador.textContent = randomFocus ? "Enfocado" : "Distraído";
    nivelAtencion.textContent = `${attentionLevel}%`;
    estadoOperador.className = randomFocus ? "text-green-600" : "text-red-600";

    if (!randomFocus) {
      alertasList.innerHTML =
        '<li class="bg-red-100 text-red-800 p-3 rounded-md text-sm">⚠️ El operador se distrajo</li>';
    } else {
      alertasList.innerHTML =
        '<li class="bg-green-50 text-green-700 p-3 rounded-md text-sm">✅ Sin alertas activas</li>';
    }
  }, 5000);

  // Gráfica con Chart.js
  const ctx = document.getElementById("attentionChart").getContext("2d");
  const attentionChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["0s", "5s", "10s", "15s", "20s", "25s"],
      datasets: [
        {
          label: "Nivel de Atención (%)",
          data: [90, 85, 88, 92, 87, 91],
          borderColor: "#2563EB",
          borderWidth: 2,
          tension: 0.3,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          min: 0,
          max: 100,
          ticks: { stepSize: 20 },
        },
      },
    },
  });
});
