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
  const editor = document.getElementById("editorActividad");
  const resultado = document.getElementById("resultadoConsulta");
  const correcta = document.getElementById("consulta").value.trim() === editor.dataset.respuesta;
  const estado = correcta ? "correcto" : "incorrecto";
  const mensaje = correcta ? "Consulta correcta" : "Consulta incorrecta";
  const simbolo = correcta ? "✓" : "✗";

  resultado.className = `resultados ${estado}`;
  resultado.innerHTML = `<p>${mensaje} ${simbolo}</p>`;

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
  const numero = actividad.dataset.actividad;
  const editor = document.getElementById("editorActividad");
  const resultado = document.getElementById("resultadoConsulta");

  // Marca la actividad seleccionada.
  document.querySelector(".activa").classList.remove("activa");
  actividad.classList.add("activa");

  // Actualiza la terminal y limpia el resultado anterior.
  editor.dataset.respuesta = respuestas[numero - 1];
  document.getElementById("tituloActividad").textContent = `Actividad ${numero}`;
  document.getElementById("consulta").value = "";
  resultado.className = "resultados";
  resultado.innerHTML = "<p>Ejecuta una consulta para visualizar el resultado.</p>";
}

// Activa los botones y las actividades cuando carga la página.
document.addEventListener("DOMContentLoaded", function () {
  const botonDiagrama = document.getElementById("verDiagrama");
  const botonVolver = document.getElementById("volver");
  const botonConsulta = document.getElementById("ejecutarConsulta");
  const actividades = document.querySelectorAll(".seleccionable");

  if (botonDiagrama) {
    botonDiagrama.onclick = irAlDiagrama;
  }

  if (botonVolver) {
    botonVolver.onclick = volverAlInicio;
  }

  if (botonConsulta) {
    botonConsulta.onclick = revisarConsulta;
  }

  actividades.forEach((actividad) => {
    actividad.onclick = () => seleccionarActividad(actividad);
  });
});

