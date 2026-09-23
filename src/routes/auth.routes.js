const express = require('express');
const router = express.Router();
const { login, logout } = require('../auth/auth.controller');
const { verificarToken } = require('../auth/auth.middleware');
const { verificarRBAC } = require('../rbac/rbac.middleware');

router.post('/login', login);
router.post('/logout', verificarToken, logout);

router.get('/perfil', verificarToken, (req, res) => {
  res.json({ usuario: req.usuario });
});

router.delete('/prueba-eliminar', verificarToken, verificarRBAC('eliminar_documento'), (req, res) => {
  res.json({ mensaje: 'RBAC OK: tienes permiso para eliminar documentos' });
});

module.exports = router;