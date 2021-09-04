const { Paginate } = require('../utils/utils');
const { selectAllData } = require('../database/crud');

module.exports = {
  getUsers: async (req, resp, next) => {
    try {
      const url = `${req.protocol}://${req.get('host')}${req.path}`;
      const options = {
        page: parseInt(req.query.page, 10) || 1,
        limit: parseInt(req.query.limit, 10) || 10,
      };
      const usersData = await selectAllData('users');

      resp.links(Paginate(url, options, usersData));
      return resp.status(200).json(usersData);
    } catch (error) {
      next(error);
    }
  },
  // createUser: (req, resp, next) => {},
};
