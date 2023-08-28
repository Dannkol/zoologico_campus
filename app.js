import express from 'express'
import dotenv from 'dotenv'
import routesVersioning from 'express-routes-versioning'
import configureApp from './src/config/configExpress.js'
import { routes as routes_habitat_js } from './src/routes/v1/habitat.routes.js'

dotenv.config()

const app = express()
const version = routesVersioning()

// Configurar la aplicación Express
configureApp(app)

// Definir las rutas

app.use('/habitat',
  version({
    '1.0.0': routes_habitat_js
  })

)

// Definir puertos de escuhca

const HOST = JSON.parse(process.env.SERVER)

const PORT = HOST.PORT || 8080

app.listen(PORT, async () => {
    console.log(`listening at http://${HOST.HOSTNAME}:${PORT}`)
  })
