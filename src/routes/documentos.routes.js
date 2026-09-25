const express = require('express');
const router = express.Router();
const documentos = require('../data/documentos');
const { verificarToken } = require('../auth/auth.middleware');
const { autorizarDocumento, autorizarOperacion } = require('../middlewares/autorizacion.middleware');
const { registrarEvento } = require('../audit/audit.service');

router.post('/', verificarToken, ...autorizarOperacion('crear_documento'), (req, res) => {
  const { titulo, descripcion, departamento, nivel_confidencialidad, pais } = req.body;

  if (!titulo || !departamento || nivel_confidencialidad === undefined) {
    return res.status(400).json({ error: 'Faltan campos requeridos: titulo, departamento, nivel_confidencialidad' });
  }

  const nuevoId = Math.max(...documentos.map(d => d.id)) + 1;

  const nuevoDocumento = {
    id: nuevoId,
    titulo,
    descripcion: descripcion || '',
    propietario: req.usuario.id,
    departamento,
    nivel_confidencialidad,
    estado: 'PENDIENTE',
    pais: pais || req.usuario.pais,
    fecha_creacion: new Date().toISOString().slice(0, 10),
  };

  documentos.push(nuevoDocumento);

  registrarEvento({
    usuario: req.usuario.correo,
    recurso: `documento-${nuevoDocumento.id}`,
    accion: 'CREATE',
    resultado: 'PERMITIDO',
    motivo: 'Documento creado exitosamente',
  });

  res.status(201).json({ mensaje: 'Documento creado', documento: nuevoDocumento });
});

router.get('/:id', verificarToken, ...autorizarDocumento('consultar_documento'), (req, res) => {
  res.json({ documento: req.documento });
});

router.put('/:id', verificarToken, ...autorizarDocumento('modificar_documento'), (req, res) => {
  const { titulo, descripcion, nivel_confidencialidad, estado } = req.body;

  if (titulo !== undefined) req.documento.titulo = titulo;
  if (descripcion !== undefined) req.documento.descripcion = descripcion;
  if (nivel_confidencialidad !== undefined) req.documento.nivel_confidencialidad = nivel_confidencialidad;
  if (estado !== undefined) req.documento.estado = estado;

  res.json({ mensaje: 'Documento modificado', documento: req.documento });
});

router.delete('/:id', verificarToken, ...autorizarDocumento('eliminar_documento'), (req, res) => {
  const index = documentos.findIndex(d => d.id === req.documento.id);
  documentos.splice(index, 1);
  res.json({ mensaje: 'Documento eliminado' });
});

router.post('/:id/aprobar', verificarToken, ...autorizarDocumento('aprobar_documento'), (req, res) => {
  req.documento.estado = 'PUBLICADO';
  res.json({ mensaje: 'Documento aprobado y publicado', documento: req.documento });
});

router.get('/', verificarToken, ...autorizarOperacion('consultar_documento'), (req, res) => {
  res.json({ documentos });
});

module.exports = router;