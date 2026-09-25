const express = require('express');
const router = express.Router();
const { verificarToken } = require('../auth/auth.middleware');
const { autorizarOperacion } = require('../middlewares/autorizacion.middleware');
const { obtenerAuditoria } = require('../audit/audit.service');

router.get('/', verificarToken, ...autorizarOperacion('ver_auditoria'), (req, res) => {
  res.json({ auditoria: obtenerAuditoria() });
});

module.exports = router;