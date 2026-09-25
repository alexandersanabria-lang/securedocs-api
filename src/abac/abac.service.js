function evaluarPoliticas(usuario, documento, operacion, contexto = {}) {
  const { horaActual = new Date().getHours(), dispositivo = 'DESCONOCIDO' } = contexto;

  // Política 7 — Estado del usuario (aplica siempre, a cualquier operación)
  if (usuario.estado !== 'ACTIVO') {
    return { permitido: false, motivo: 'Política 7: usuario suspendido o inactivo' };
  }

  // Política 8 — Invitados (reemplaza las demás políticas para este rol)
  if (usuario.rol === 'INVITADO') {
    const cumpleInvitado =
      usuario.tipo_contrato === 'EXTERNO' &&
      documento.nivel_confidencialidad <= 1 &&
      documento.estado === 'PUBLICADO';

    if (!cumpleInvitado) {
      return { permitido: false, motivo: 'Política 8: invitado no cumple condiciones de acceso público' };
    }
    return { permitido: true, motivo: 'Política 8: invitado cumple condiciones de acceso público' };
  }

  // Operaciones sobre un documento existente: consultar, modificar, eliminar, aprobar
  const operacionesSobreDocumento = ['consultar_documento', 'modificar_documento', 'eliminar_documento', 'aprobar_documento'];

  if (operacionesSobreDocumento.includes(operacion)) {
    // Política 1 — Departamento
    if (usuario.departamento !== documento.departamento) {
      return { permitido: false, motivo: 'Política 1: el documento no pertenece a tu departamento' };
    }

    // Política 2 — Nivel de seguridad
    if (usuario.nivel_seguridad < documento.nivel_confidencialidad) {
      return { permitido: false, motivo: 'Política 2: nivel de seguridad insuficiente' };
    }

    // Política 4 — Horario (documentos con confidencialidad >= 4)
    if (documento.nivel_confidencialidad >= 4 && (horaActual < 8 || horaActual >= 18)) {
      return { permitido: false, motivo: 'Política 4: documento altamente confidencial fuera de horario (08:00-18:00)' };
    }

    // Política 5 — País
    if (documento.pais === 'PERU' && usuario.pais !== 'PERU') {
      return { permitido: false, motivo: 'Política 5: documento de Perú solo accesible desde Perú' };
    }

    // Política 6 — Dispositivo (confidencialidad 4 o 5)
    if (documento.nivel_confidencialidad >= 4 && dispositivo !== 'CORPORATIVO') {
      return { permitido: false, motivo: 'Política 6: documento requiere dispositivo corporativo' };
    }
  }

  if (operacion === 'modificar_documento') {
    // Política 3 — Propiedad (GERENTE y ADMINISTRADOR exceptuados)
    const exceptuado = usuario.rol === 'GERENTE' || usuario.rol === 'ADMINISTRADOR';
    if (!exceptuado && usuario.id !== documento.propietario) {
      return { permitido: false, motivo: 'Política 3: solo el propietario puede modificar este documento' };
    }
  }

  return { permitido: true, motivo: 'Todas las políticas ABAC aplicables se cumplen' };
}

module.exports = { evaluarPoliticas };