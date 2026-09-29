// Abre el diagrama de la base de datos.
function irAlDiagrama() {
  window.location.href = "DiagramaER.HTML";
}

// Abre la información del proyecto.
function irAInfo() {
  window.location.href = "Info.HTML";
}

// Regresa a la página principal.
function volverAlInicio() {
  window.location.href = "Base.HTML";
}

// Pistas para revisar cada actividad.
const feedbacks = [
  "Revisá SELECT, los campos id_alumno, nombre y apellido, la tabla alumnos y LIMIT 5;",
  "Revisá SELECT nombre y promedio, WHERE promedio >= 8.5 y ORDER BY promedio DESC;",
  "Revisá id_curso, AVG(nota_final), AS promedio_curso y GROUP BY id_curso;"
];

// Comprueba si la consulta escrita es correcta.
function revisarConsulta() {
  // Obtiene los elementos necesarios de la terminal.
  const editor = document.getElementById("editorActividad");
  const resultado = document.getElementById("resultadoConsulta");
  const consulta = document.getElementById("consulta").value.trim();
  const actividad = document.querySelector(".activa");
  const numero = actividad.dataset.actividad;
  const correcta = consulta === editor.dataset.respuesta;
  // Define el estilo y el mensaje según el resultado.
  const estado = correcta ? "correcto" : "incorrecto";
  let mensaje = "Consulta correcta ✓";

  if (!correcta) {
    mensaje = consulta ? `Consulta incorrecta ✗<br>${feedbacks[numero - 1]}` : "Escribí una consulta para comenzar.";
  }

  resultado.className = `resultados ${estado}`;
  resultado.innerHTML = `<p>${mensaje}</p>`;

  // Marca la actividad cuando la respuesta es correcta.
  if (correcta) {
    document.querySelector(".activa").classList.add("hecha");
    document.querySelector(".activa .estado-actividad").textContent = "✓";
    actualizarProgreso();
  }
}

// Actualiza el contador y muestra el mensaje final.
function actualizarProgreso() {
  const hechas = document.querySelectorAll(".hecha").length;
  document.getElementById("progreso").textContent = `Actividades completadas: ${hechas} de 3`;

  if (hechas === 3) {
    document.getElementById("mensajeFinal").classList.add("mostrar");
  }
}

// Reinicia la actividad que está seleccionada.
function reiniciarActividad() {
  const actividad = document.querySelector(".activa");
  actividad.classList.remove("hecha");
  actividad.querySelector(".estado-actividad").textContent = "";
  document.getElementById("consulta").value = "";
  document.getElementById("resultadoConsulta").className = "resultados";
  document.getElementById("resultadoConsulta").innerHTML = "<p>Ejecuta una consulta para visualizar el resultado.</p>";
  document.getElementById("mensajeFinal").classList.remove("mostrar");
  actualizarProgreso();
}

// Cambia la respuesta esperada según la actividad seleccionada.
function seleccionarActividad(actividad) {
  // Respuestas correctas de las tres actividades.
  const respuestas = [
    "SELECT id_alumno, nombre, apellido FROM alumnos LIMIT 5;",
    "SELECT nombre, promedio FROM estudiantes WHERE promedio >= 8.5 ORDER BY promedio DESC;",
    "SELECT id_curso, AVG(nota_final) AS promedio_curso FROM inscripciones GROUP BY id_curso;"
  ];
  // Obtiene el número de la actividad seleccionada.
  const numero = actividad.dataset.actividad;
  const editor = document.getElementById("editorActividad");
  const resultado = document.getElementById("resultadoConsulta");

  // Marca la actividad seleccionada.
  document.querySelector(".activa").classList.remove("activa");
  actividad.classList.add("activa");

  // Cambia la respuesta esperada y limpia la terminal.
  editor.dataset.respuesta = respuestas[numero - 1];
  document.getElementById("tituloActividad").textContent = `Actividad ${numero}`;
  document.getElementById("consulta").value = "";
  resultado.className = "resultados";
  resultado.innerHTML = "<p>Ejecuta una consulta para visualizar el resultado.</p>";
}

// Activa los botones y las actividades cuando carga la página.
document.addEventListener("DOMContentLoaded", function () {
  // Busca los botones y las actividades de la página.
  const botonDiagrama = document.getElementById("verDiagrama");
  const botonInfo = document.getElementById("verInfo");
  const botonVolver = document.getElementById("volver");
  const botonConsulta = document.getElementById("ejecutarConsulta");
  const botonReiniciar = document.getElementById("reiniciarActividad");
  const actividades = document.querySelectorAll(".seleccionable");

  // Conecta el botón con el diagrama ER.
  if (botonDiagrama) {
    botonDiagrama.onclick = irAlDiagrama;
  }

  // Conecta el botón con la información del proyecto.
  if (botonInfo) {
    botonInfo.onclick = irAInfo;
  }

  // Conecta el botón para volver al inicio.
  if (botonVolver) {
    botonVolver.onclick = volverAlInicio;
  }

  // Conecta el botón que revisa la consulta.
  if (botonConsulta) {
    botonConsulta.onclick = revisarConsulta;
  }

  // Conecta el botón para reiniciar la actividad.
  if (botonReiniciar) {
    botonReiniciar.onclick = reiniciarActividad;
  }

  // Permite seleccionar cualquier actividad.
  actividades.forEach((actividad) => {
    actividad.onclick = () => seleccionarActividad(actividad);
  });
});

