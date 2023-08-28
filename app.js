import express from 'express'
import dotenv from 'dotenv'
import { routes as routes_personal_js } from './src/routes/v1/personal.routes.js'
import routesVersioning from 'express-routes-versioning'
import configureApp from './src/config/configExpress.js'

dotenv.config()

const app = express()
const version = routesVersioning()
// Configurar la aplicación Express
configureApp(app)

// Definir las rutasres
app.use('/personal',
  version({
    '1.0.0': routes_personal_js
  })

)

// Definir puertos de escuhca

const HOST = JSON.parse(process.env.SERVER)

const PORT = HOST.PORT || 8080

app.listen(PORT, async () => {
  console.log(`Example app listening at http://${HOST.HOSTNAME}:${PORT}`)
})
