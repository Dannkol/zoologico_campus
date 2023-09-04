import express from 'express'
import dotenv from 'dotenv'
import routesVersioning from 'express-routes-versioning'
import configureApp from './src/config/configExpress.js'
import { routes as routes_habitat_js } from './src/routes/v2-3/habitat.routes.js'
import { routes as routes_habitat_js_v1 } from './src/routes/v1/habitar.routes.js'
import { routes as routes_personal_js } from './src/routes/v2-3/personal.routes.js'

import { routes as routes_animal_v1 } from './src/routes/v1/animal.routes.js'
import { routes as routes_animal_v2 } from './src/routes/v2-3/animal.routes.js'
import { routes as routes_visitas_v2 } from './src/routes/v2-3/visitas.routes.js'
import { routes as routes_visitas_v1 } from './src/routes/v1/visitas.routes.js'
import { routes as routes_investigaciones_v2 } from './src/routes/v2-3/investigaciones.routes.js'
import { routes as routes_investigaciones_v1 } from './src/routes/v1/investigaciones.routes.js'
import { routes as routes_auth_v1 } from './src/routes/v1/auth.routes.js'

import { routes as defaul_route } from './src/routes/defaul.routes.js'
// Rutas version 1

dotenv.config()

const app = express()

const version = routesVersioning()
// Configurar la aplicación Express
configureApp(app)
configureApp(app)
app.use(express.urlencoded({ extended: true }))

// Definir las rutasres
app.use('/personal',
  version({
    '2.0.0': routes_personal_js,
    '^2.0.0': defaul_route,
    '~3.0.0': defaul_route,
    '~2.0.0': defaul_route
  })
)
app.use('/habitat',
  version({
    '^1.0.0': routes_habitat_js_v1,
    '^2.0.0': routes_habitat_js,
    '^3.0.0': defaul_route
  })

)
app.use('/animal',
  version({
    '1.0.0': routes_animal_v1,
    '^2.0.0': routes_animal_v2,
    '^3.0.0': defaul_route,
    '~1.0.0': defaul_route
  })
)

app.use('/visitas',
  version({
    '2.0.0': routes_visitas_v2,
    '1.0.0': routes_visitas_v1,
    '~1.0.0': defaul_route,
    '~2.0.0': defaul_route,
    '^2.0.0': defaul_route,
    '^1.0.0': defaul_route
  })
)

app.use('/investigaciones',
  version({
    '1.0.0': routes_investigaciones_v1,
    '2.0.0': routes_investigaciones_v2,
    '~1.0.0': defaul_route,
    '~2.0.0': defaul_route,
    '^2.0.0': defaul_route,
    '^1.0.0': defaul_route
  })
)
app.use('/auth',
  version({
    '1.0.0': routes_auth_v1
  })
)

// Definir puertos de escuhca

const HOST = JSON.parse(process.env.SERVER)

const PORT = HOST.PORT || 8080

app.listen(PORT, async () => {
  console.log(`Example app listening at http://${HOST.HOSTNAME}:${PORT}`)
})
