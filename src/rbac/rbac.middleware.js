const { tienePermiso } = require('./rbac.service');
const { registrarEvento } = require('../audit/audit.service');

const accionesPorOperacion = {
  crear_documento: 'CREATE',
  consultar_documento: 'READ',
  modificar_documento: 'UPDATE',
  eliminar_documento: 'DELETE',
  aprobar_documento: 'APPROVE',
};

function verificarRBAC(operacion) {
  return (req, res, next) => {
    const rol = req.usuario.rol;

    if (!tienePermiso(rol, operacion)) {
      const recurso = req.params.id ? `documento-${req.params.id}` : 'documentos';

      registrarEvento({
        usuario: req.usuario.correo,
        recurso,
        accion: accionesPorOperacion[operacion] || operacion,
        resultado: 'DENEGADO',
        motivo: `RBAC: el rol ${rol} no tiene permiso para ${operacion}`,
      });

      return res.status(403).json({
        error: 'Acceso denegado por RBAC',
        motivo: `El rol ${rol} no tiene permiso para: ${operacion}`,
      });
    }

    next();
  };
}

module.exports = { verificarRBAC };