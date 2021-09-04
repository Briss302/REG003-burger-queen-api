const conexion = require('./database');

module.exports = {
  selectAllData: (table) => new Promise((resolve, reject) => {
    const sql = `SELECT * FROM ${table}`;
    conexion.query(sql, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  }),
  insert: () => {},
  update: () => {},
  delete: () => {},
};
