let totalJugadores = Number(prompt("¿Cuántos jugadores participarán? (Máx 10)"));
if (isNaN(totalJugadores) || totalJugadores <= 0) totalJugadores = 1;
if (totalJugadores > 10) totalJugadores = 10;

let jugadores = [];
let jugadorActual = 0;

for (let i = 0; i < totalJugadores; i++) {
  jugadores.push({ numeros: [], aciertos: [] });
}

const mensaje = document.getElementById("mensaje");
const jugadorTxt = document.getElementById("jugador");
const credito = document.getElementById("credito");
const ganado = document.getElementById("ganado");
const ganadoresTxt = document.getElementById("ganadores");
const botonesDiv = document.getElementById("botones");
const elegidosTxt = document.getElementById("elegidos");
const coincidenciasTxt = document.getElementById("coincidencias");

function mostrarMensaje(txt) {
  mensaje.textContent = txt;
}

for (let i = 1; i <= 48; i++) {
  const btn = document.createElement("button");
  btn.textContent = i;

  btn.addEventListener("click", () => {
    if (credito.value <= 0) {
      mostrarMensaje("No tienes créditos");
      return;
    }

    let nums = jugadores[jugadorActual].numeros;

    if (nums.length < 6 && !nums.includes(i)) {
      nums.push(i);
      btn.disabled = true;
      elegidosTxt.textContent = "Elegidos: " + nums.join(", ");
    }

    if (nums.length === 6) {
      if (jugadorActual < totalJugadores - 1) {
        jugadorActual++;
        jugadorTxt.textContent = "Jugador " + (jugadorActual + 1);
        elegidosTxt.textContent = "Elegidos:";
        mostrarMensaje("Turno del jugador " + (jugadorActual + 1));
        document.querySelectorAll("#botones button").forEach(b => b.disabled = false);
      }
    }
  });

  botonesDiv.appendChild(btn);
}

document.getElementById("sorteo").addEventListener("click", () => {
  if (jugadores.some(j => j.numeros.length < 6)) {
    mostrarMensaje("Todos los jugadores deben elegir 6 números");
    return;
  }

  credito.value--;

  let lista = Array.from({ length: 48 }, (_, i) => i + 1);
  let ganadores = [];

  for (let i = 0; i < 6; i++) {
    let pos = Math.floor(Math.random() * lista.length);
    ganadores.push(lista.splice(pos, 1)[0]);
  }

  ganadoresTxt.textContent = "Ganadores: " + ganadores.join(", ");

  let resultado = "";
  jugadores.forEach((j, i) => {
    let aciertos = j.numeros.filter(n => ganadores.includes(n));
    resultado += `Jugador ${i + 1}: ${aciertos.length} aciertos (${aciertos.join(", ")}) | `;
    if (aciertos.length >= 3) ganado.value = Number(ganado.value) + aciertos.length * 10;
  });

  coincidenciasTxt.textContent = resultado;
  mostrarMensaje("Sorteo realizado");
});

document.getElementById("limpiar").addEventListener("click", () => {
  jugadores.forEach(j => j.numeros = []);
  jugadorActual = 0;
  jugadorTxt.textContent = "Jugador 1";
  elegidosTxt.textContent = "Elegidos:";
  coincidenciasTxt.textContent = "Coincidencias:";
  ganadoresTxt.textContent = "Ganadores:";
  mostrarMensaje("Juego reiniciado");
  document.querySelectorAll("#botones button").forEach(b => b.disabled = false);
});

document.getElementById("creditoBtn").addEventListener("click", () => {
  let dinero = Number(prompt("Ingresa dinero para créditos:"));
  if (dinero > 0) {
    credito.value = Number(credito.value) + dinero;
    mostrarMensaje("Créditos añadidos");
  } else {
    mostrarMensaje("Monto inválido");
  }
});
