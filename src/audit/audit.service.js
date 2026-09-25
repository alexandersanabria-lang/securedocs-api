const auditoria = [];

function registrarEvento({ usuario, recurso, accion, resultado, motivo }) {
  const registro = {
    usuario,
    recurso,
    accion,
    fecha: new Date().toISOString(),
    resultado,
    motivo,
  };
  auditoria.push(registro);
  return registro;
}

function obtenerAuditoria() {
  return auditoria;
}

module.exports = { registrarEvento, obtenerAuditoria };