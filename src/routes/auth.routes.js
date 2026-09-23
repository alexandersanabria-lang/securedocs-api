const express = require('express');
const router = express.Router();
const { login, logout } = require('../auth/auth.controller');
const { verificarToken } = require('../auth/auth.middleware');

router.post('/login', login);
router.post('/logout', verificarToken, logout);

router.get('/perfil', verificarToken, (req, res) => {
  res.json({ usuario: req.usuario });
});

module.exports = router;