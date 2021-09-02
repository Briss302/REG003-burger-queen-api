const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const conexion = require('../database/database');

const { secret } = config;

module.exports = {
  authenticateUser: async (req, resp, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(400);
      }

      // TODO: autenticar a la usuarix
      await conexion.query(
        'SELECT * FROM users WHERE email =?', email,
        (error, result) => {
          if (error) throw error;
          if (result.length < 1) {
            return resp.status(400).json({ msg: 'usuario no exite' });
          }
          result.forEach((doc) => bcrypt.compare(password, doc.password,
            (error, result) => {
              if (error) console.info(error);
              if (!result) return resp.status(404).json({ msg: 'contraseña incorrecta' });
              jwt.sign(
                {
                  uid: doc.id,
                  email: doc.email,
                  rolesAdmin: doc.rolesAdmin,
                },
                secret,
                { expiresIn: 60 * 60 },
                (error, token) => {
                  if (error) {
                    console.error(error);
                  }
                  return resp.status(200).json({ token });
                },
              );
            }));
        },
      );
    } catch (error) {
      return next(error);
    }
  },
};
