const jwt = require('jsonwebtoken');
const { SECRET } = require('./jwt.config');
const usuarios = require('../data/usuarios');

function login(req, res) {
  const { correo, contraseña } = req.body;

  const usuario = usuarios.find(u => u.correo === correo);

  if (!usuario || usuario.contraseña !== contraseña) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  if (usuario.estado !== 'ACTIVO') {
    return res.status(403).json({ error: 'Usuario suspendido o inactivo' });
  }

  const payload = {
    id: usuario.id,
    nombre: usuario.nombre,
    correo: usuario.correo,
    rol: usuario.rol,
    departamento: usuario.departamento,
    nivel_seguridad: usuario.nivel_seguridad,
    pais: usuario.pais,
    tipo_contrato: usuario.tipo_contrato,
    estado: usuario.estado,
  };

  const token = jwt.sign(payload, SECRET, { expiresIn: '2h' });

  res.json({ mensaje: 'Login exitoso', token, usuario: payload });
}

function logout(req, res) {
  // Con JWT no hay estado en servidor: el cliente simplemente descarta el token.
  res.json({ mensaje: 'Sesión cerrada. Descarta el token en el cliente.' });
}

module.exports = { login, logout };