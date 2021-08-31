require('dotenv').config({ path: 'secrets.env' });

exports.db = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_ROOT_USER,
  password: process.env.DB_ROOT_PASSWORD,
};

// exports.dbUrl = process.env.DB_URL || 'mysql://localhost:3306/test';
exports.port = process.argv[2] || process.env.PORT || 8080;
exports.secret = process.env.JWT_SECRET || 'esta-es-la-api-burger-queen';
exports.adminEmail = process.env.ADMIN_EMAIL || 'admin@localhost';
exports.adminPassword = process.env.ADMIN_PASSWORD || 'changeme';
