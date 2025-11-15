// public/js/main.js

console.log("✅ JS cargado correctamente.");

// Ejemplo de actualización de datos en dashboard
const refreshBtn = document.getElementById("refreshBtn");
const lastUpdate = document.getElementById("last-update");
const activityLog = document.getElementById("activity-log");

if (refreshBtn) {
  refreshBtn.addEventListener("click", () => {
    const now = new Date().toLocaleTimeString();
    lastUpdate.textContent = now;

    // Simulación de actualización de log
    if (activityLog) {
      const li = document.createElement("li");
      li.textContent = `Actualización realizada a las ${now}`;
      li.className = "text-sm text-gray-700";
      activityLog.prepend(li);
    }
  });
}
