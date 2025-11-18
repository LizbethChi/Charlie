// ===========================
// DATOS SIMULADOS
// ===========================
const operadores = [
  { nombre: "Carlos M.", rol: "Operador", estado: "Activo" },
  { nombre: "José L.", rol: "Operador", estado: "Inactivo" },
  { nombre: "Ana R.", rol: "Supervisor", estado: "Activo" },
  { nombre: "María P.", rol: "Operador", estado: "Activo" },
  { nombre: "Luis G.", rol: "Supervisor", estado: "Inactivo" },
];

const tabla = document.getElementById("tablaOperadores");

// ===========================
// FUNCION PARA RENDERIZAR
// ===========================
function renderOperadores() {
  tabla.innerHTML = "";

  operadores.forEach(op => {
    const tr = document.createElement("tr");
    tr.className = "hover:bg-gray-800 transition-all cursor-pointer";

    const estadoColor = op.estado === "Activo" ? "green-400" : "red-400";

    tr.innerHTML = `
      <td class="py-2">${op.nombre}</td>
      <td>${op.rol}</td>
      <td class="text-${estadoColor}">${op.estado}</td>
      <td>${new Date().toLocaleString()}</td>
      <td class="underline text-blue-400">Ver detalles</td>
    `;
    tabla.appendChild(tr);
  });
}

// ===========================
// INICIALIZAR
// ===========================
renderOperadores();
