const jwt = require('jsonwebtoken');

// Función para generar el token JWT
function generarToken(usuario) {
  const payload = {
    usuario: {
      id: usuario.idusuario,
      username: usuario.username,
    },
  };

  const token = jwt.sign(payload, 'clav3s3cr3ta', {
    expiresIn: '15m',
  });

  return token;
}


module.exports = { generarToken };

