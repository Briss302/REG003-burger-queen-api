const conexion = require('./database');

module.exports = {
  selectAllData: (table) => new Promise((resolve, reject) => {
    const sql = `SELECT * FROM ${table}`;
    conexion.query(sql, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  }),
  insert: (table, dataToInsert) => new Promise((resolve, reject) => {
    const sql = `INSERT INTO ${table} SET ?`;
    conexion.query(sql, [dataToInsert], (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  }),
  updateById: (table, dataToUpdate, keyValue) => new Promise((resolve, reject) => {
    const sql = `UPDATE ${table} SET ? WHERE ${keyValue} =?`;
    conexion.query(sql, [dataToUpdate], (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  }),
  delete: (table, keyValue) => new Promise((resolve, reject) => {
    const sql = `DELETE FROM ${table} WHERE ${keyValue} =?`;
    conexion.query(sql, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  }),
};
