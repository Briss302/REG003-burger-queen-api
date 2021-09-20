const conexion = require('./database');
const { isAValidNumb, isAValidEmail } = require('../utils/utils');

module.exports = {
  selectAllData: (table) => new Promise((resolve, reject) => {
    const sql = `SELECT * FROM ${table}`;
    conexion.query(sql, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  }),
  selectDataByUid: (table, valueUid) => new Promise((resolve, reject) => {
    let sql;
    if (isAValidNumb(valueUid)) {
      sql = `SELECT * FROM ${table} WHERE id =?`;
    }
    if (isAValidEmail(valueUid)) {
      sql = `SELECT * FROM ${table} WHERE email =?`;
    }
    conexion.query(sql, valueUid, (error, result) => {
      if (error) reject(error);
      resolve(result[0]);
    });
  }),
  insertData: (table, dataToInsert) => new Promise((resolve, reject) => {
    const sql = `INSERT INTO ${table} SET ?`;
    conexion.query(sql, [dataToInsert], (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  }),
  updateDataByUid: (table, dataToUpdate, valueUid) => new Promise((resolve, reject) => {
    let sql;
    if (isAValidNumb(valueUid)) {
      sql = `UPDATE ${table} SET ? WHERE id =?`;
    }
    if (isAValidEmail(valueUid)) {
      sql = `UPDATE ${table} SET ? WHERE email =?`;
    }
    conexion.query(sql, [dataToUpdate, valueUid], (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  }),
  deleteDataByUid: (table, valueUid) => new Promise((resolve, reject) => {
    let sql;
    if (isAValidNumb(valueUid)) {
      sql = `DELETE FROM ${table} WHERE id =?`;
    }
    if (isAValidEmail(valueUid)) {
      sql = `DELETE FROM ${table} WHERE email =?`;
    }
    conexion.query(sql, valueUid, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  }),
};
