function irAlDiagrama() {
  window.location.href = "DiagramaER.HTML";
}

function volverAlInicio() {
  window.location.href = "Base.HTML";
}

function revisarConsulta() {
  const consultaCorrecta = "SELECT id_alumno, nombre, apellido FROM alumnos LIMIT 5;";
  const consultaEscrita = document.getElementById("mensaje").value.trim();
  const resultado = document.getElementById("resultadoConsulta");

  if (consultaEscrita === consultaCorrecta) {
    resultado.className = "tarjeta resultados correcto";
    resultado.innerHTML = "<p>Consulta correcta.</p>";
  } else {
    resultado.className = "tarjeta resultados incorrecto";
    resultado.innerHTML = "<p>Consulta incorrecta.</p>";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const botonDiagrama = document.getElementById("verDiagrama");
  const botonVolver = document.getElementById("volver");
  const botonConsulta = document.getElementById("ejecutarConsulta");

  if (botonDiagrama) {
    botonDiagrama.onclick = irAlDiagrama;
  }

  if (botonVolver) {
    botonVolver.onclick = volverAlInicio;
  }

  if (botonConsulta) {
    botonConsulta.onclick = revisarConsulta;
  }
});

