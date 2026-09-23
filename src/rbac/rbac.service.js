const permisosPorRol = require('../data/roles');

function tienePermiso(rol, operacion) {
  const permisos = permisosPorRol[rol];

  if (!permisos) return false;

  return permisos[operacion] === true;
}

module.exports = { tienePermiso };