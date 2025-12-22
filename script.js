/* ===== TEXTOS ===== */
const pGanador = document.createElement("p");
pGanador.textContent = "Ganadores:";
document.body.appendChild(pGanador);

const pBoliyapa = document.createElement("p");
pBoliyapa.textContent = "Boliyapa:";
document.body.appendChild(pBoliyapa);

const pSiosi = document.createElement("p");
pSiosi.textContent = "Si o Si:";
document.body.appendChild(pSiosi);


/* ===== BOTÓN JUGADORES ===== */
const btnJugadores = document.createElement("button");
btnJugadores.textContent = "Jugadores";
document.body.appendChild(btnJugadores);

/* ===== BOTONES PRINCIPALES ===== */
const btnJugar = document.createElement("button");
btnJugar.textContent = "Jugar 6";
document.body.appendChild(btnJugar);

const btnSiosi = document.createElement("button");
btnSiosi.textContent = "Si o si";
document.body.appendChild(btnSiosi);

const btnBoliyapa = document.createElement("button");
btnBoliyapa.textContent = "Boliyapa";
document.body.appendChild(btnBoliyapa);

/* ===== CONTENEDOR JUGADORES ===== */
const listaJugadores = document.createElement("div");
listaJugadores.id = "listaJugadores";
document.body.appendChild(listaJugadores);

/* ===== MODAL ===== */
const divJugadores = document.createElement("div");
divJugadores.id = "divJugadores";

const modal = document.createElement("div");
modal.id = "modal";
modal.innerHTML = `
<h3>Jugador</h3>
<input type="text" id="txtNombre" placeholder="Nombre"><br><br>
<div id="divBotones"></div><br>
<input type="text" id="divSeleccionado" readonly placeholder="Números"><br><br>
<button id="btnGuardar">Guardar</button>
<button id="btnCerrar">Cerrar</button>
`;

divJugadores.appendChild(modal);
document.body.appendChild(divJugadores);

/* ===== VARIABLES ===== */
const divBotones = document.getElementById("divBotones");
const divSeleccionado = document.getElementById("divSeleccionado");

let numerosSeleccionados = [];
let jugadores = [];
let numerosGanadores = [];
let numeroSiosi = null;
let ganadoresSiosi = [];
let numeroBoliyapa = null;
let ganadoresBoliyapa = [];


/* ===== BOTONES 1 AL 48 ===== */
for(let i=1;i<=48;i++){
  const b = document.createElement("button");
  b.textContent = i;

  b.onclick = () => {
    if(numerosSeleccionados.length >= 6){
      alert("Solo 6 números");
      return;
    }
    numerosSeleccionados.push(i);
    b.disabled = true;
    divSeleccionado.value = numerosSeleccionados.join(", ");
  };

  divBotones.appendChild(b);
}

/* ===== GUARDAR JUGADOR ===== */
document.getElementById("btnGuardar").onclick = () => {
  const nombre = document.getElementById("txtNombre").value.trim();
  if(nombre==="" || numerosSeleccionados.length!==6){
    alert("Completa nombre y 6 números");
    return;
  }

  jugadores.push({
    nombre,
    numeros:[...numerosSeleccionados],
    aciertos:0
  });

  actualizarLista();

  // limpiar
  document.getElementById("txtNombre").value="";
  divSeleccionado.value="";
  numerosSeleccionados=[];
  divBotones.querySelectorAll("button").forEach(b=>b.disabled=false);
};

/* ===== LISTAR JUGADORES ===== */
function actualizarLista(){
  listaJugadores.innerHTML = "<h3>Jugadores</h3>";
  jugadores.forEach(j=>{
    const div = document.createElement("div");
    div.className="jugador";
    div.innerHTML = `
      <b>${j.nombre}</b><br>
      Números: ${j.numeros.join(", ")}<br>
      Coincidencias: ${j.aciertos}<br>
      Si o Sí: ${
        numeroSiosi !== null
          ? (j.numeros.includes(numeroSiosi) ? "Gana" : "X")
          : "-"
      }<br>
      Boliyapa: ${
        numeroBoliyapa !== null
        ? (j.numeros.includes(numeroBoliyapa) ? "Gana" : "X")
      : "-" 
      }
    `;
    listaJugadores.appendChild(div);
  });
}

/* ===== JUGAR ===== */
btnJugar.onclick = () => {
  numerosGanadores=[];
  let lista = Array.from({length:48},(_,i)=>i+1);

  for(let i=0;i<6;i++){
    let r = Math.floor(Math.random()*lista.length);
    numerosGanadores.push(lista[r]);
    lista.splice(r,1);
  }

  pGanador.textContent = "Ganadores: " + numerosGanadores.join(", ");

  jugadores.forEach(j=>{
    j.aciertos = j.numeros.filter(n=>numerosGanadores.includes(n)).length;
  });

  actualizarLista();
};

btnSiosi.onclick = () => {

  if(numerosGanadores.length !== 6){
    alert("Primero debes jugar los 6 números");
    return;
  }

  // elegir 1 número de los ganadores
  numeroSiosi = numerosGanadores[
    Math.floor(Math.random() * numerosGanadores.length)
  ];

  ganadoresSiosi = jugadores.filter(j =>
    j.numeros.includes(numeroSiosi)
  );

  // mostrar resultado
  if(ganadoresSiosi.length > 0){
    pSiosi.textContent =
      "Si o Si: Número " + numeroSiosi +
      " | Ganadores: " +
      ganadoresSiosi.map(j => j.nombre).join(", ");
  } else {
    pSiosi.textContent =
      "Si o Si: Número " + numeroSiosi +
      " | No hubo ganadores";
  }
};

btnBoliyapa.onclick = () => {

  if(jugadores.length === 0){
    alert("No hay jugadores registrados");
    return;
  }

  // sorteo libre del 1 al 48
  numeroBoliyapa = Math.floor(Math.random() * 48) + 1;

  ganadoresBoliyapa = jugadores.filter(j =>
    j.numeros.includes(numeroBoliyapa)
  );

  // mostrar resultado
  if(ganadoresBoliyapa.length > 0){
    pBoliyapa.textContent =
      "Boliyapa: Número " + numeroBoliyapa +
      " | Ganadores: " +
      ganadoresBoliyapa.map(j => j.nombre).join(", ");
  } else {
    pBoliyapa.textContent =
      "Boliyapa: Número " + numeroBoliyapa +
      " | No hubo ganadores";
  }

  actualizarLista();
};



/* ===== MODAL ===== */
btnJugadores.onclick = ()=> divJugadores.style.display="flex";
document.getElementById("btnCerrar").onclick = ()=> divJugadores.style.display="none";
