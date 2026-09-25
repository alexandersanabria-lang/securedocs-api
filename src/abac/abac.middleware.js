const { evaluarPoliticas } = require('./abac.service');
const documentos = require('../data/documentos');
const { registrarEvento } = require('../audit/audit.service');

const accionesPorOperacion = {
  crear_documento: 'CREATE',
  consultar_documento: 'READ',
  modificar_documento: 'UPDATE',
  eliminar_documento: 'DELETE',
  aprobar_documento: 'APPROVE',
};

function cargarDocumento(req, res, next) {
  const id = parseInt(req.params.id);
  const documento = documentos.find(d => d.id === id);

  if (!documento) {
    return res.status(404).json({ error: 'Documento no encontrado' });
  }

  req.documento = documento;
  next();
}

function verificarABAC(operacion) {
  return (req, res, next) => {
    const contexto = {
      horaActual: new Date().getHours(),
      dispositivo: req.headers['x-dispositivo'] || 'DESCONOCIDO',
    };

    const resultado = evaluarPoliticas(req.usuario, req.documento, operacion, contexto);
    const recurso = `documento-${req.documento.id}`;
    const accion = accionesPorOperacion[operacion] || operacion;

    registrarEvento({
      usuario: req.usuario.correo,
      recurso,
      accion,
      resultado: resultado.permitido ? 'PERMITIDO' : 'DENEGADO',
      motivo: resultado.motivo,
    });

    if (!resultado.permitido) {
      return res.status(403).json({ error: 'Acceso denegado por ABAC', motivo: resultado.motivo });
    }

    next();
  };
}

module.exports = { cargarDocumento, verificarABAC };