const bcrypt = require('bcrypt');
const { Paginate, isAValidEmail, isAValidNumb } = require('../utils/utils');
const {
  selectAllData,
  selectDataByUid,
  insertData,
  updateDataByUid,
  deleteDataByUid,
} = require('../database/crud');
const { isAdmin } = require('../middleware/auth');

module.exports = {
  getUsers: async (req, resp, next) => {
    try {
      const url = `${req.protocol}://${req.get('host')}${req.path}`;
      const options = {
        page: parseInt(req.query.page, 10) || 1,
        limit: parseInt(req.query.limit, 10) || 10,
      };
      const usersData = await selectAllData('users', options.page, options.limit);
      resp.links(Paginate(url, options, usersData));
      return resp.status(200).send(usersData);
    } catch (error) {
      next(error);
    }
  },
  getUserUid: async (req, resp, next) => {
    try {
      const { uid } = req.params;
      if (isAValidNumb(uid) || isAValidEmail(uid)) {
        const findUser = await selectDataByUid('users', uid);
        // si la usuaria solicitada no existe
        if (!findUser) return next(404);
        let role;
        if (findUser.rolesAdmin === 1) {
          role = true;
        } else {
          role = false;
        }
        if (req.authToken.uid === findUser.id || isAdmin(req)) {
          return resp.status(200).send({
            _id: findUser.id.toString(),
            email: findUser.email,
            roles: { admin: role },
          });
        }
        return next(403);
      }
      return next(404);
    } catch (error) {
      next(error);
    }
  },
  createUser: async (req, resp, next) => {
    try {
      const { email, password, roles } = req.body;
      let role;
      if (req.body.roles) {
        role = req.body.roles;
      } else {
        role = { admin: false };
      }
      if (!email || !password || password.length <= 3) return next(400);
      if (!isAValidEmail(email)) return next(400);
      const findUser = await selectDataByUid('users', email);
      if (findUser) return next(403);
      const sendNewUser = {
        email,
        password: bcrypt.hashSync(password, 10),
        rolesAdmin: roles ? roles.admin : false,
      };
      insertData('users', sendNewUser);
      const getNewUser = await selectDataByUid('users', email);
      resp.status(200).send({
        _id: getNewUser.id.toString(),
        email: getNewUser.email,
        roles: role,
      });
    } catch (error) {
      next(error);
    }
  },
  updateUser: async (req, resp, next) => {
    try {
      const { uid } = req.params;
      const user = req.body;
      if (isAValidNumb(uid) || isAValidEmail(uid)) {
        const findUser = await selectDataByUid('users', uid);
        // si la usuaria solicitada no existe
        if (!findUser) return next(404);
        // una usuaria no admin intenta de modificar sus `roles`
        if (!isAdmin(req) && user.roles) return next(403);
        // si no es ni admin o la misma usuaria
        if (req.authToken.uid !== findUser.id && !isAdmin(req)) {
          return next(403);
        }
        // si no se proveen `email` o `password` o ninguno de los dos
        if (Object.keys(user).length === 0) return next(400);
        // si se proveen `email` o `password` no validos
        const valueEmail = user.email ? isAValidEmail(user.email) : true;
        if (!valueEmail) return next(400);

        // Actualizar Datos
        const sendUpdate = {
          email: user.email ? user.email : findUser.email,
          password: bcrypt.hashSync(user.password, 10),
          rolesAdmin: user.roles ? user.roles.admin : findUser.rolesAdmin,
        };
        updateDataByUid('users', sendUpdate, uid);

        // Mostrar Datos actualizados
        const getUpdateUser = await selectDataByUid('users', uid);
        let role;
        if (getUpdateUser.rolesAdmin === 1) {
          role = true;
        } else {
          role = false;
        }
        return resp.status(200).send({
          email: getUpdateUser.email,
          password: getUpdateUser.password,
          roles: { admin: role },
        });
      }
      return next(404);
    } catch (error) {
      console.error(error);
    }
  },
  deleteUser: async (req, resp, next) => {
    try {
      const { uid } = req.params;
      if (isAValidNumb(uid) || isAValidEmail(uid)) {
        const findUser = await selectDataByUid('users', uid);
        // si la usuaria solicitada no existe
        if (!findUser) return next(404);
        // si no es ni admin o la misma usuaria
        if (req.authToken.uid !== findUser.id && !isAdmin(req)) {
          return next(403);
        }

        // Delete usuario
        deleteDataByUid('users', uid);
        // Mostrar usuario eliminado
        let role;
        if (findUser.rolesAdmin === 1) {
          role = true;
        } else {
          role = false;
        }
        return resp.status(200).send({
          email: findUser.email,
          password: findUser.password,
          roles: { admin: role },
        });
      }
      return next(404);
    } catch (error) {
      console.error(error);
    }
  },
};
