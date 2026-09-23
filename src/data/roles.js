const permisosPorRol = {
  ADMINISTRADOR: { crear_documento: true, consultar_documento: true, modificar_documento: true, eliminar_documento: true, aprobar_documento: true, ver_auditoria: true, gestionar_usuarios: true, asignar_roles: true },
  GERENTE:       { crear_documento: true, consultar_documento: true, modificar_documento: true, eliminar_documento: true, aprobar_documento: true, ver_auditoria: true, gestionar_usuarios: false, asignar_roles: false },
  SUPERVISOR:    { crear_documento: true, consultar_documento: true, modificar_documento: true, eliminar_documento: false, aprobar_documento: true, ver_auditoria: false, gestionar_usuarios: false, asignar_roles: false },
  EMPLEADO:      { crear_documento: true, consultar_documento: true, modificar_documento: true, eliminar_documento: false, aprobar_documento: false, ver_auditoria: false, gestionar_usuarios: false, asignar_roles: false },
  AUDITOR:       { crear_documento: false, consultar_documento: true, modificar_documento: false, eliminar_documento: false, aprobar_documento: false, ver_auditoria: true, gestionar_usuarios: false, asignar_roles: false },
  INVITADO:      { crear_documento: false, consultar_documento: true, modificar_documento: false, eliminar_documento: false, aprobar_documento: false, ver_auditoria: false, gestionar_usuarios: false, asignar_roles: false },
};

module.exports = permisosPorRol;