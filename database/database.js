const mysql = require('mysql');
const config = require('../config');

const { db } = config;

const conexion = mysql.createConnection(db);
// eslint-disable-next-line no-console
module.exports = conexion;
