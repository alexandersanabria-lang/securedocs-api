const { tienePermiso } = require('./rbac.service');

function verificarRBAC(operacion) {
  return (req, res, next) => {
    const rol = req.usuario.rol;

    if (!tienePermiso(rol, operacion)) {
      return res.status(403).json({
        error: 'Acceso denegado por RBAC',
        motivo: `El rol ${rol} no tiene permiso para: ${operacion}`,
      });
    }

    next();
  };
}

module.exports = { verificarRBAC };