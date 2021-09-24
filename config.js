const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: 'secrets.env' });
}

exports.db = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 23306,
  database: process.env.DB_NAME || 'bq_test',
  user: process.env.DB_ROOT_USER || 'root',
  password: process.env.DB_ROOT_PASSWORD || 'test_secret',
};

exports.dbUrl = process.env.DB_URL || 'mysql://localhost:3306/test';
exports.port = process.argv[2] || process.env.PORT || 8080;
exports.secret = process.env.JWT_SECRET || 'esta-es-la-api-burger-queen';
exports.adminEmail = process.env.ADMIN_EMAIL || 'admin@localhost';
exports.adminPassword = process.env.ADMIN_PASSWORD || 'changeme';
