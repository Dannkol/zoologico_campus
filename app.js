import express from 'express'
import dotenv from 'dotenv'
import routesVersioning from 'express-routes-versioning'
import configureApp from './src/config/configExpress.js'
import { routes as routes_habitat_js } from './src/routes/v1/habitat.routes.js'
import { routes as routes_personal_js } from './src/routes/v1/personal.routes.js'


import { routes as routes_animal_v1 } from "./src/routes/v1/animal.routes.js";
import { routes as routes_visitas_v1 } from './src/routes/v1/visitas.routes.js'

// Rutas version 1

dotenv.config();

const app = express();

const version = routesVersioning();
// Configurar la aplicación Express
configureApp(app)
configureApp(app);
app.use(express.urlencoded({ extended: true }));

// Definir las rutasres
app.use('/personal',
  version({
    '1.0.0': routes_personal_js
  })
)
app.use('/habitat',
  version({
    '1.0.0': routes_habitat_js
  })

)
app.use('/animal',
version({
      "1.0.0": routes_animal_v1,
    })
);

app.use('/visitas',
version({
      "1.0.0": routes_visitas_v1,
    })
);


// Definir puertos de escuhca

const HOST = JSON.parse(process.env.SERVER);

const PORT = HOST.PORT || 8080

app.listen(PORT, async () => {
  console.log(`Example app listening at http://${HOST.HOSTNAME}:${PORT}`);
});
