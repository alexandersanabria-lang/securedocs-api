const jwt = require('jsonwebtoken');
const { SECRET } = require('./jwt.config');

function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, SECRET);
    req.usuario = payload; // queda disponible para RBAC/ABAC en las siguientes etapas
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

module.exports = { verificarToken };