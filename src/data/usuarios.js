const usuarios = [
  { id: 1, nombre: 'Admin Principal', correo: 'admin@techcorp.com', contraseña: 'admin123', rol: 'ADMINISTRADOR', departamento: 'TI', nivel_seguridad: 5, pais: 'PERU', tipo_contrato: 'INTERNO', estado: 'ACTIVO' },
  { id: 2, nombre: 'Laura Gómez', correo: 'laura.gomez@techcorp.com', contraseña: 'gerente123', rol: 'GERENTE', departamento: 'FINANZAS', nivel_seguridad: 4, pais: 'PERU', tipo_contrato: 'INTERNO', estado: 'ACTIVO' },
  { id: 3, nombre: 'Carlos Ruiz', correo: 'carlos.ruiz@techcorp.com', contraseña: 'super123', rol: 'SUPERVISOR', departamento: 'FINANZAS', nivel_seguridad: 3, pais: 'PERU', tipo_contrato: 'INTERNO', estado: 'ACTIVO' },
  { id: 4, nombre: 'Ana Torres', correo: 'ana.torres@techcorp.com', contraseña: 'emp123', rol: 'EMPLEADO', departamento: 'FINANZAS', nivel_seguridad: 2, pais: 'PERU', tipo_contrato: 'INTERNO', estado: 'ACTIVO' },
  { id: 5, nombre: 'Pedro Ramos', correo: 'pedro.ramos@techcorp.com', contraseña: 'emp123', rol: 'EMPLEADO', departamento: 'RRHH', nivel_seguridad: 2, pais: 'PERU', tipo_contrato: 'INTERNO', estado: 'ACTIVO' },
  { id: 6, nombre: 'Sofía Vega', correo: 'sofia.vega@techcorp.com', contraseña: 'aud123', rol: 'AUDITOR', departamento: 'AUDITORIA', nivel_seguridad: 3, pais: 'PERU', tipo_contrato: 'INTERNO', estado: 'ACTIVO' },
  { id: 7, nombre: 'Marco Díaz', correo: 'marco.diaz@externo.com', contraseña: 'inv123', rol: 'INVITADO', departamento: 'EXTERNO', nivel_seguridad: 1, pais: 'PERU', tipo_contrato: 'EXTERNO', estado: 'ACTIVO' },
  { id: 8, nombre: 'Jorge Paredes', correo: 'jorge.paredes@techcorp.com', contraseña: 'emp123', rol: 'EMPLEADO', departamento: 'FINANZAS', nivel_seguridad: 2, pais: 'CHILE', tipo_contrato: 'INTERNO', estado: 'ACTIVO' },
  { id: 9, nombre: 'Rosa Medina', correo: 'rosa.medina@techcorp.com', contraseña: 'susp123', rol: 'EMPLEADO', departamento: 'FINANZAS', nivel_seguridad: 2, pais: 'PERU', tipo_contrato: 'INTERNO', estado: 'INACTIVO' },
];

module.exports = usuarios;