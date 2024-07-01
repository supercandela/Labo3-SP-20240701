import Planeta from "./Planeta.js";
import {
  obtenerTodos,
  crearUno,
  obtenerUno,
  borrarTodos,
  obtenerTodosFetch,
  editarUnoFetch,
  borrarUnoFetch,
} from "./api.js";

// ------>  Variables

//Array de objetos a usar
let listado = [];
let listadoConFiltro = [];

//Campos del form
let elementId = document.getElementById("element-id");
let nombre = document.getElementById("nombre");
let tamano = document.getElementById("tamano");
let masa = document.getElementById("masa");
let tipo = document.getElementById("tipo");
let distancia = document.getElementById("distancia");
let vida = document.getElementById("vida");
let anillo = document.getElementById("anillo");
let atmosfera = document.getElementById("atmosfera");

// Botones
const btnSubmit = document.getElementById("btnSubmit");
const btnEliminar = document.getElementById("btnEliminar");
const btnCancelar = document.getElementById("btnCancelar");
const btnEliminarTodos = document.getElementById("btnEliminarTodos");
const btnCalcular = document.getElementById("btnCalcular");

//Divs
const spinnerContenedor = document.getElementById("spinnerContenedor");
const tablaContenedor = document.getElementById("tabla");
const checkMostrar = document.getElementById("checkParaMostrar");

const tipoFiltro = document.getElementById("tipoFiltro");

// ------>  Event Listeners

window.addEventListener("DOMContentLoaded", async () => {
  // Obtener el año actual y setearlo en el footer
  const anioActual = new Date().getFullYear();
  document.getElementById("anio").textContent = anioActual;

  mostrarSpinner();
  listado = await obtenerTodos();
  ocultarSpinner();

  mostrarOcultarColumnas(listado[0]);
  displayTabla();
  document.addEventListener("click", onClick);
  btnEliminar.addEventListener("click", onEliminarElemento);
  btnEliminarTodos.addEventListener("click", onEliminarTodos);
  btnCancelar.addEventListener("click", onCancelar);
});

// Evento click
btnSubmit.addEventListener("click", guardarElemento);
btnCalcular.addEventListener("click", calcularPromedio);

// Evento enter
btnSubmit.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    guardarElemento(e);
  }
});

// Evento Change filtro
tipoFiltro.addEventListener("change", displayTabla);

// ------>  Funciones

//Manipulación Tabla

function mostrarOcultarColumnas(lista) {
  for (const key in lista) {
    if (key != "id") {
      let div = document.createElement("div");
      let label = document.createElement("label");
      let input = document.createElement("input");

      label.textContent = key;
      input.setAttribute("type", "checkbox");
      input.checked = true;
      input.addEventListener("change", onCambioInput);

      label.appendChild(input);
      div.appendChild(label);
      checkMostrar.appendChild(div);
    }
  }
  cargarListadoConFiltro();
}

function cargarListadoConFiltro() {
  let inputs = document.querySelectorAll("#checkParaMostrar>div>label>input");
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].checked) {
      listadoConFiltro.push(inputs[i].parentNode.textContent);
    }
  }
}

function onCambioInput(e) {
  e.preventDefault();
  listadoConFiltro = [];
  cargarListadoConFiltro();
  displayTabla();
}

function borrarTabla() {
  let tabla = tablaContenedor.firstChild;
  tablaContenedor.removeChild(tabla);
}

function displayTabla() {
  if (tablaContenedor.hasChildNodes()) {
    borrarTabla();
  }
  const listaAMostrar =
    tipoFiltro.value === ""
      ? listado
      : listado.filter((elemento) => elemento.tipo === tipoFiltro.value);
  const tabla = crearTabla(listaAMostrar);
  tablaContenedor.appendChild(tabla);
}

function crearTabla(lista) {
  //Crear tabla
  const tabla = document.createElement("table");
  tabla.classList.add("responsiveTable");
  //Crear headers
  tabla.appendChild(tablaCrearHeaders(lista[0]));
  //Crear body
  tabla.appendChild(tablaCrearBody(lista));
  return tabla;
}

function tablaCrearHeaders(lista) {
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  for (const key in lista) {
    if (key != "id" && listadoConFiltro.includes(key)) {
      const th = document.createElement("th");
      th.textContent = key;
      tr.appendChild(th);
    }
  }
  thead.appendChild(tr);
  return thead;
}

function tablaCrearBody(lista) {
  const tbody = document.createElement("tbody");
  lista.forEach((element) => {
    const tr = document.createElement("tr");
    for (const key in element) {
      if (key === "id") {
        tr.setAttribute("data-id", element[key]);
      } else {
        if (listadoConFiltro.includes(key)) {
          const td = document.createElement("td");
          td.setAttribute("data-label", key);
          td.textContent = element[key];
          tr.appendChild(td);
        }
      }
    }
    tbody.appendChild(tr);
  });
  return tbody;
}

//Manipulación Spinner
function mostrarSpinner() {
  spinnerContenedor.classList.add("spinner");
}

function ocultarSpinner() {
  spinnerContenedor.classList.remove("spinner");
}

//Manipulación Formulario
function vaciarFormulario() {
  elementId.value = "";
  nombre.value = "";
  tamano.value = "";
  masa.value = "";
  tipo.value = "";
  distancia.value = "";
  vida.checked = false;
  anillo.checked = false;
  atmosfera.value = "";
}

function cargarFormulario(objeto) {
  elementId.value = objeto.id;
  nombre.value = objeto.nombre;
  tamano.value = objeto.tamano;
  masa.value = objeto.masa;
  tipo.value = objeto.tipo;
  distancia.value = objeto.distancia_al_sol;
  vida.checked = objeto.presencia_de_vida;
  anillo.checked = objeto.posee_anillo;
  atmosfera.value = objeto.composicion_atmosferica;
}

function cambiarBotones(target) {
  if (target.matches("td")) {
    btnSubmit.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> Editar';
    if (btnSubmit.classList.contains("btn-success")) {
      btnSubmit.classList.remove("btn-success");
      btnSubmit.classList.add("btn-warning");
    }
    if (btnEliminar.classList.contains("btnEliminarHide")) {
      btnEliminar.classList.remove("btnEliminarHide");
    }
    btnEliminar.classList.add("btnEliminarShow");
  } else {
    btnSubmit.innerHTML = '<i class="fa-regular fa-floppy-disk"></i> Guardar';
    if (btnSubmit.classList.contains("btn-warning")) {
      btnSubmit.classList.remove("btn-warning");
      btnSubmit.classList.add("btn-success");
    }
    if (btnEliminar.classList.contains("btnEliminarShow")) {
      btnEliminar.classList.remove("btnEliminarShow");
    }
    btnEliminar.classList.add("btnEliminarHide");
  }
}

async function onClick(e) {
  if (e.target.matches("td")) {
    let id = e.target.parentNode.dataset.id;
    mostrarSpinner();
    cargarFormulario(await obtenerUno(id));
    ocultarSpinner();
    cambiarBotones(e.target);
    document
      .querySelector("section.formulario-principal")
      .scrollIntoView(false, { behavior: "smooth" });
  } else if (e.target.matches("div#checkParaMostrar")) {
    console.log("-----> click");
  } else if (
    !e.target.matches("input") &&
    !e.target.matches("textarea") &&
    !e.target.matches("label") &&
    !e.target.matches("select") &&
    !e.target.matches("option")
  ) {
    cambiarBotones(e.target);
    vaciarFormulario();
  }
}

function onCancelar() {
  vaciarFormulario();
  cambiarBotones();
}

// Manipulación Elementos

async function guardarElemento(e) {
  e.preventDefault();

  if (
    nombre.value === "" ||
    tamano.value === "" ||
    masa.value === "" ||
    tipo.value === "" ||
    distancia.value === "" ||
    atmosfera.value === ""
  ) {
    alert(
      "El planeta debe tener un nombre, tamaño, masa, tipo, distancia al sol y composición atmosférica"
    );
    return;
  }

  if (
    nombre.value !== "" &&
    tamano.value !== "" &&
    masa.value !== "" &&
    tipo.value !== "" &&
    distancia.value !== "" &&
    atmosfera.value !== ""
  ) {
    borrarTabla();
    mostrarSpinner();
    if (parseInt(elementId.value) > 0) {
      if (!confirm("Confirma la modificación")) {
        return;
      }
      await editarUnoFetch(crearPlaneta());
    } else {
      await crearUno(crearPlaneta());
    }
    vaciarFormulario();
    listado = await obtenerTodosFetch();
    displayTabla(listado);
    ocultarSpinner();
  }
}

function crearPlaneta() {
  let id = parseInt(elementId.value);
  let newId;
  if (id) {
    newId = id;
  } else {
    newId = Date.now();
  }
  let element = new Planeta(
    newId,
    nombre.value,
    tamano.value,
    masa.value,
    tipo.value,
    distancia.value,
    vida.checked,
    anillo.checked,
    atmosfera.value
  );
  return element;
}

async function onEliminarElemento(e) {
  if (confirm("Confirma la Eliminacion")) {
    mostrarSpinner();
    await borrarUnoFetch(crearPlaneta());
    vaciarFormulario();
    listado = await obtenerTodosFetch();
    displayTabla(listado);
    ocultarSpinner();
  }
}

async function onEliminarTodos(e) {
  if (confirm("¿Confirma la Eliminacion de TODOS los elementos?")) {
    mostrarSpinner();
    await borrarTodos();
    vaciarFormulario();
    listado = await obtenerTodosFetch();
    displayTabla(listado);
    ocultarSpinner();
  }
}

// Map - Reduce - Filter

function calcularPromedio() {
  const listaConFiltroParaCalcular =
  tipoFiltro.value === ""
    ? listado
    : listado.filter((elemento) => elemento.tipo === tipoFiltro.value);

  let sumatoria = listaConFiltroParaCalcular.reduce((a, b) => a + b.distancia_al_sol, 0);
  if (listaConFiltroParaCalcular.length != 0) {
    let promedio = sumatoria / listaConFiltroParaCalcular.length;
    document.getElementById("promedio").value = promedio;
  } else {
    document.getElementById("promedio").value = "No hay planetas seleccionados.";  
  }
}