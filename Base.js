// Abre el diagrama de la base de datos.
function irAlDiagrama() {
  window.location.href = "DiagramaER.HTML";
}

// Regresa a la página principal.
function volverAlInicio() {
  window.location.href = "Base.HTML";
}

// Comprueba si la consulta escrita es correcta.
function revisarConsulta() {
  // Obtiene los elementos necesarios de la terminal.
  const editor = document.getElementById("editorActividad");
  const resultado = document.getElementById("resultadoConsulta");
  const correcta = document.getElementById("consulta").value.trim() === editor.dataset.respuesta;
  // Define el estilo y el mensaje según el resultado.
  const estado = correcta ? "correcto" : "incorrecto";
  const mensaje = correcta ? "Consulta correcta" : "Consulta incorrecta";
  const simbolo = correcta ? "✓" : "✗";

  resultado.className = `resultados ${estado}`;
  resultado.innerHTML = `<p>${mensaje} ${simbolo}</p>`;

  // Marca la actividad cuando la respuesta es correcta.
  if (correcta) {
    document.querySelector(".activa").classList.add("hecha");
    document.querySelector(".activa .estado-actividad").textContent = "✓";
  }
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

  // Actualiza la terminal y limpia el resultado anterior.
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
  const botonVolver = document.getElementById("volver");
  const botonConsulta = document.getElementById("ejecutarConsulta");
  const actividades = document.querySelectorAll(".seleccionable");

  // Conecta el botón con el diagrama ER.
  if (botonDiagrama) {
    botonDiagrama.onclick = irAlDiagrama;
  }

  // Conecta el botón para volver al inicio.
  if (botonVolver) {
    botonVolver.onclick = volverAlInicio;
  }

  // Conecta el botón que revisa la consulta.
  if (botonConsulta) {
    botonConsulta.onclick = revisarConsulta;
  }

  // Permite seleccionar cualquier actividad.
  actividades.forEach((actividad) => {
    actividad.onclick = () => seleccionarActividad(actividad);
  });
});

