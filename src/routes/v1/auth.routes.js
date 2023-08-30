import { Router } from 'express'
import { AuthController } from '../../controllers/AuthController.js'
import { validateInfo } from '../../middleware/middleware_validate_register.js'
import { validateInfoInicioSesion } from '../../middleware/middleware_validate_inicioSesion.js'

export const routes = Router()

routes.post('/registro', validateInfo, AuthController.manejadorRegistro)
routes.post('/inicioSesion', validateInfoInicioSesion, AuthController.inicioSesion)
