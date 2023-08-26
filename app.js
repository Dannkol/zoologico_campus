import express from 'express';
import dotenv from "dotenv";


import configureApp from './src/config/configExpress.js';

dotenv.config();

const app = express();

// Configurar la aplicación Express
configureApp(app);

// Definir las rutas


// Definir puertos de escuhca

const HOST = JSON.parse(process.env.SERVER)

const PORT = HOST.PORT || 8080;

app.listen(PORT, async () => {
    console.log(`Example app listening at http://${HOST.HOSTNAME}:${PORT}`);
  });
