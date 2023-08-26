import express from "express";
import dotenv from "dotenv";

import routesVersioning from "express-routes-versioning";

import configureApp from "./src/config/configExpress.js";

import { routes as routes_animal_v1 } from "./src/routes/v1/animal.routes.js";

// Rutas version 1

dotenv.config();

const app = express();

const version = routesVersioning();
// Configurar la aplicación Express
configureApp(app);
app.use(express.urlencoded({ extended: true }));

// Definir las rutas

app.use('/animal',
version({
      "1.0.0": routes_animal_v1,
    })
);

// Definir puertos de escuhca

const HOST = JSON.parse(process.env.SERVER);

const PORT = HOST.PORT || 8080;

app.listen(PORT, async () => {
  console.log(`Example app listening at http://${HOST.HOSTNAME}:${PORT}`);
});
