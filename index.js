const express = require('express');
const config = require('./config');
const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/error');
const routes = require('./routes');
const pkg = require('./package.json');
const error = require('./middleware/error');
// Referencia a la conexión de la Base de Datos (MySQL)
const conexion = require('./database/database');

const { port, secret } = config;
const app = express();

// TODO: Conexión a la Base de Datos (MySQL)
conexion.connect((error) => {
  if (error) {
    throw error;
  } else {
    console.info('db is conected');
  }
});

app.set('config', config);
app.set('pkg', pkg);

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(authMiddleware(secret));

// Registrar rutas
routes(app, (err) => {
  if (err) {
    throw err;
  }

  app.use(errorHandler);

  app.listen(port, () => {
    console.info(`App listening on port ${port}`);
  });
});
