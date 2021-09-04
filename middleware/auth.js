const jwt = require('jsonwebtoken');
const conexion = require('../database/database');

module.exports = (secret) => (req, resp, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next();
  }

  const [type, token] = authorization.split(' ');

  if (type.toLowerCase() !== 'bearer') {
    return next();
  }

  jwt.verify(token, secret, async (err, decodedToken) => {
    try {
      if (err) {
        return next(403);
      }
      // TODO: Verificar identidad del usuario usando `decodeToken.uid`
      await conexion.query('SELECT * FROM users WHERE id =?', decodedToken.uid, (error, result) => {
        if (error) throw error;
        if (result.length < 1) return next(404);
        req.authToken = decodedToken;
        return next();
      });
    } catch (err) {
      return next(403);
    }
  });
};

// TODO: decidir por la informacion del request si la usuaria esta autenticada
module.exports.isAuthenticated = (req) => req.authToken || false;

module.exports.isAdmin = (req) => {
  // TODO: decidir por la informacion del request si la usuaria es admin
  if (req.authToken.rolesAdmin === 1) {
    return true;
  }
  return false;
};

module.exports.requireAuth = (req, resp, next) => (
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : next()
);

module.exports.requireAdmin = (req, resp, next) => (
  // eslint-disable-next-line no-nested-ternary
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : (!module.exports.isAdmin(req))
      ? next(403)
      : next()
);
