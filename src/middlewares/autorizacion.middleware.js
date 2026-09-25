const { verificarRBAC } = require('../rbac/rbac.middleware');
const { cargarDocumento, verificarABAC } = require('../abac/abac.middleware');

// Para operaciones sobre un documento que ya existe (consultar, modificar, eliminar, aprobar)
function autorizarDocumento(operacion) {
  return [
    verificarRBAC(operacion),  // Paso 1: RBAC
    cargarDocumento,           // Carga req.documento desde req.params.id
    verificarABAC(operacion),  // Paso 2: ABAC
  ];
}

// Para operaciones sin documento existente (crear), solo aplica RBAC
function autorizarOperacion(operacion) {
  return [verificarRBAC(operacion)];
}

module.exports = { autorizarDocumento, autorizarOperacion };